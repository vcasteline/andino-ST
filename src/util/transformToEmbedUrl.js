export const transformToEmbedUrl = (url) => {
    let embedUrl = '';
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)(?:$|\/|\?)/;

    const youtubeMatch = url.match(youtubeRegex);
    const vimeoMatch = url.match(vimeoRegex);

    if (youtubeMatch && youtubeMatch[1]) {
        embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    } else if (vimeoMatch && vimeoMatch[1]) {
        embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return embedUrl;
};