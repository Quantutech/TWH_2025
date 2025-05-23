const SmtpConfig = {
    from: process.env.SMTP_FROM ?? "",
    host: process.env.SMTP_HOST ?? "",
    port: process.env.SMTP_PORT ?? "",
    secure: process.env.SMTP_SSL === "true",
    auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASS ?? ""
    }
};

export default SmtpConfig;
