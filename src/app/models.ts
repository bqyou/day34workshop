export interface country{
    name: string
    code: string
    flag: string
}


export interface Query{
    country: string
    category: string
}

export interface News{
    title: string
    author: string
    description: string
    publishedAt: string
    urlToImage: string
}