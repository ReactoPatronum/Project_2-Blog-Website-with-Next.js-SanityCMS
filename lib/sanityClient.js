import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client=sanityClient({
    projectId:"yay1r3oy",
    dataset:"production",
    apiVersion:"2022-05-27",
    useCdn:true,
    token:"skyg8GEMQNVMX39NIOZEHPE7LzsDJSzE4V5JoDavNsRyfSVXNyXpP65gU8TvJC3bKOOEezGI8wyj47WsIWVj05o5Ba7GqCkKXMv5ikLvhfDnYpPnUkETgy7Wb6DMBW63Cx5uBgd3OuCNVyxXZyETqWbYrGowqKQmo4NNNFyRsJnaGx08OSGB"
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);