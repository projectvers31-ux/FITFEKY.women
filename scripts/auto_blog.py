import os
import json
import requests
from datetime import datetime
import google.generativeai as genai

# 1. Environment Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
SITE_URL = "https://yourwebsite.com"  # Replace with your actual domain

genai.configure(api_key=GEMINI_API_KEY)

# 2. Generate English Article via Gemini API
def generate_article():
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={"response_mime_type": "application/json"}
    )
    
    prompt = """
    You are an expert SEO fitness writer for adults aged 40-60. 
    Write an engaging, SEO-friendly article about low-impact home fitness, joint health, or metabolism after 40.
    
    Return strictly a JSON object with this exact structure:
    {"title": "...", "slug": "...", "description": "...", "content": "..."}
    """
    
    response = model.generate_content(prompt)
    return response.text

# 3. Save as MDX File
def save_mdx(article_json):
    data = json.loads(article_json)
    slug = data['slug'].lower().replace(" ", "-")
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    mdx_content = f"""---
title: "{data['title']}"
date: "{date_str}"
description: "{data['description']}"
---

{data['content']}
"""
    filepath = f"content/posts/{slug}.mdx"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(mdx_content)
        
    return slug, data['title'], data['description']

# 4. Notify Telegram Channel (In English)
def post_to_telegram(title, slug, description):
    url = f"{SITE_URL}/posts/{slug}"
    message = f"📢 **New Post Published!**\n\n📌 **{title}**\n\n{description}\n\n👉 Read the full article here:\n{url}"
    
    tg_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    requests.post(tg_url, json={"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"})

# 5. Execution
if __name__ == "__main__":
    article_json = generate_article()
    slug, title, desc = save_mdx(article_json)
    post_to_telegram(title, slug, desc)
    print("English article successfully generated and broadcasted!")
