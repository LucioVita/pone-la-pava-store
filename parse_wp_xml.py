import xml.etree.ElementTree as ET
import json
import re

def clean_html(raw_html):
    if not raw_html: return ""
    raw_html = re.sub(r'<div class="stanleypm.*?>', '', raw_html)
    raw_html = re.sub(r'</div>', '', raw_html)
    cleantext = re.sub('<.*?>', '', raw_html)
    return cleantext.strip()

try:
    tree = ET.parse('WordPress.2026-02-22.xml')
    root = tree.getroot()
    items = root.findall('.//item')
    print(f"Found {len(items)} items total in XML.")

    ns = {
        'wp': 'http://wordpress.org/export/1.2/',
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }

    attachments = {}
    post_type_counts = {}
    
    for item in items:
        pt_el = item.find('wp:post_type', ns)
        if pt_el is not None:
            pt = pt_el.text
            post_type_counts[pt] = post_type_counts.get(pt, 0) + 1
            if pt == 'attachment':
                pid_el = item.find('wp:post_id', ns)
                url_el = item.find('wp:attachment_url', ns)
                if pid_el is not None and url_el is not None:
                    attachments[pid_el.text] = url_el.text

    print("Post type counts:", post_type_counts)
    print(f"Found {len(attachments)} image attachments.")

    products = []
    for item in items:
        pt_el = item.find('wp:post_type', ns)
        status_el = item.find('wp:status', ns)
        
        if pt_el is not None and pt_el.text == 'product' and status_el is not None and status_el.text == 'publish':
            title_el = item.find('title')
            title = title_el.text if title_el is not None else "Sin Titulo"
            
            content_el = item.find('content:encoded', ns)
            description = content_el.text if content_el is not None else ""
            
            price = "0"
            thumbnail_id = None
            for meta in item.findall('wp:postmeta', ns):
                key_el = meta.find('wp:meta_key', ns)
                if key_el is not None:
                    key = key_el.text
                    val_el = meta.find('wp:meta_value', ns)
                    value = val_el.text if val_el is not None else ""
                    if key == '_price':
                        price = value
                    elif key == '_thumbnail_id':
                        thumbnail_id = value
            
            category_name = "Mates"
            for cat in item.findall('category'):
                if cat.get('domain') == 'product_cat':
                    category_name = cat.text
                    break
            
            product_image = attachments.get(thumbnail_id) if thumbnail_id else None
            
            try:
                numeric_price = float(price) if price else 0
            except:
                numeric_price = 0

            products.append({
                "name": title,
                "price": numeric_price,
                "description": clean_html(description),
                "category": category_name,
                "imageUrl": product_image
            })

    unique_products = {}
    for p in products:
        if p['name'] not in unique_products:
            unique_products[p['name']] = p
        else:
            if p['price'] > unique_products[p['name']]['price']:
                unique_products[p['name']] = p
            if not unique_products[p['name']]['imageUrl'] and p['imageUrl']:
                unique_products[p['name']]['imageUrl'] = p['imageUrl']

    final_products = list(unique_products.values())

    with open('products_to_import.json', 'w', encoding='utf-8') as f:
        json.dump(final_products, f, ensure_ascii=False, indent=2)

    print(f"Extracted {len(final_products)} unique products.")

except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"Error: {e}")
