import nodemailer from 'nodemailer';

export const sendEmail = async (recipientEmail: string, resetLink: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "hasanbinali7556@gmail.com",
            pass: "vsmj hfhb gvhr wren",
        },
    });


    await transporter.sendMail({
        from: 'hasanbinali7556@gmail.com', 
        to: recipientEmail, 
        subject: "Password Reset Request", 
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Reset Your Password</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Don't worry, it happens!</p>
                <p style="font-size: 16px; margin: 20px 0;">Click the button below to reset your password:</p>
                <a href="${resetLink}" 
                   style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px;">
                    Reset Password
                </a>
                <p style="margin-top: 20px;">If you did not request a password reset, please ignore this email. This reset link will expire in 10 minutes.</p>
                <p>Thanks,<br>The Car Swift Team</p>
            </div> `
    });
}