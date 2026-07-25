import re

sample = """
chapter 4
आजि श्रवणेंद्रिया पिकलें । जे येणें गीतानिधान देखिलें ।
आता स्वप्नचि हें तुकलें । साचासरिसें ॥ १ ॥

आधी विवेकाची गोठी । वरी प्रतिपादी कृष्ण जगजेठी ।
आणि भक्तराजु किरीटी । परिसत असे ॥ २ ॥

     श्रीभगनानुवाच: इमं विवस्वते योगं प्रोक्तवानहमव्ययम् ।
                 विवस्वान् मनवे प्राह मनुरिक्ष्वाकवेऽब्रवीत् ॥ १ ॥

मग देव म्हणे अगा पंडुसुता । हाचि योगु आम्हीं विवस्वता ।
कथिला परी ते वार्ता । बहुवां दिवसांची ॥ १६ ॥
"""

def parse_ovis(ch_num, text):
    lines = text.strip().split('\n')
    current_chunk = []
    ovis = []
    
    for line in lines:
        line_str = line.strip()
        if not line_str:
            continue
        if line_str.lower().startswith('chapter'):
            continue
        
        current_chunk.append(line_str)
        
        # Check if this line contains a verse marker like ॥ 1 ॥ or || 1 ||
        m = re.search(r'(?:॥|\|\|)\s*([०-९0-9]+)\s*(?:॥|\|\|)', line_str)
        if m:
            ovi_num = int(m.group(1).replace('०','0').replace('१','1').replace('२','2').replace('३','3').replace('४','4').replace('५','5').replace('६','6').replace('७','7').replace('८','8').replace('९','9'))
            full_text = " ".join(current_chunk)
            ovis.append({
                "id": f"{ch_num}.{ovi_num}",
                "chapterNumber": ch_num,
                "oviNumber": ovi_num,
                "originalMarathi": full_text
            })
            current_chunk = []
            
    return ovis

res = parse_ovis(4, sample)
print(f"Parsed {len(res)} ovis:")
for o in res:
    print(o["id"], "->", o["originalMarathi"])
