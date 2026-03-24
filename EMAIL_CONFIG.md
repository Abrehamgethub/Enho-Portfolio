# Email Configuration for Eneho Egna
# Add these environment variables to your Vercel Dashboard or .env.local file

# Email Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=enehoegna@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=enehoegna@gmail.com
EMAIL_TO=enehoegna@gmail.com

# Note: For Gmail, you need to:
# 1. Enable 2-factor authentication on the Gmail account
# 2. Generate an App Password (not your regular password)
# 3. Use the App Password as EMAIL_PASS

# How to generate Gmail App Password:
# 1. Go to Google Account settings
# 2. Security → 2-Step Verification → App passwords
# 3. Generate a new app password for "Mail"
# 4. Use that 16-character password as EMAIL_PASS
