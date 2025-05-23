import path from "path";

export const emailLayoutAttachments = [
    {
        filename: 'logo.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'logo.png'),
        cid: 'logo_cid',
    },
    {
        filename: 'app_store.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'app-store.png'),
        cid: 'app_store',
    },
    {
        filename: 'google-play.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'google-play.png'),
        cid: 'google_play',
    },
    {
        filename: 'twitter.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'x.png'),
        cid: 'twitter_cid',
    },
    {
        filename: 'facebook.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'facebook.png'),
        cid: 'facebook_cid',
    },
    {
        filename: 'instagram.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'instagram.png'),
        cid: 'instagram_cid',
    },
    {
        filename: 'play.png',
        path: path.join(__dirname, '..', 'assets', 'icons', 'play.png'),
        cid: 'play_icon',
    },
];