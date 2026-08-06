import os
import json
import requests
from datetime import datetime
from google.genai import Client
from google.genai import types

# 1. Environment Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
SITE_URL = "https://www.fitfeky.com/"  # Replace with your actual domain

# Initialize Gemini Client directly
client = Client(api_key=GEMINI_API_KEY)

# 2. Generate English Article via Gemini API
def generate_article():
    prompt = """
    You are an expert SEO content writer and fitness coach specializing in health, weight loss, and joint-friendly exercise for adults aged 40 to 60.

    Write a comprehensive, engaging, high-converting, and SEO-optimized blog post about one of the following topics: 
    - Low-impact workouts for adults over 40
    - Joint-friendly cardio and mobility
    - Weight loss and slowing metabolism after 40/50
    - Pain-free home exercises using basic gear (resistance bands, foam rollers, yoga mats)

    Requirements:
    1. Tone: Empathetic, encouraging, informative, and medically sound for older adults.
    2. Structure: Catchy title, H2/H3 subheadings, bullet points, and a soft recommendation for low-impact home fitness equipment.
    3. Return STRICTLY a valid JSON object with NO extra text or markdown formatting outside the JSON:
    {
      "title": "Compelling Article Title with Target Keyword",
      "slug": "english-url-slug-separated-by-dashes",
      "description": "Engaging Meta Description under 150 characters",
      "content": "Full Markdown content with headers, paragraphs, and list items."
    }
    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )
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

# 4. Notify Telegram Channel
def post_to_telegram(title, slug, description):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not found, skipping Telegram notification.")
        return

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
