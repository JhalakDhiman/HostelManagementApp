import nodemailer from 'nodemailer'

export const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // ✅ Await added and template literals fixed with backticks
        const info = await transporter.sendMail({
            from: "Kurukshetra University Hostel management Team",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        console.log(info);

        return info;

    } catch (error) {
        console.log("error coming in mailsender: ", error);
    }
};
