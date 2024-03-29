//搜索音乐 接口返回的数据类型
export interface Rows<T> {
    result: Result<T>;
    code: number;
}


/**
 *搜索音乐返回的数据类型
 */
type Result<T> = {
    hasMore: boolean;
    songCount: number;
    songs: Array<T>;
};

/*
 *  获取的音乐列表
 * */
export interface Songs {
    album: album;
    alias: Array<string>;
    artists: Array<artist>;
    al: AlType,
    copyrightId: number;
    duration: number;
    fee: number;
    ftype: number;
    id: number;
    mark: number;
    mvid: number;
    name: string;
    rUrl: unknown;
    rtype: number;
    status: number;
}

type AlType = {
    id: Number,
    name: string,
    picUrl: string,
}
/*
 *    //
 * */
type album = {
    artist: Array<artist>;
    copyrightId: number;
    id: number;
    mark: number;
    name: string;
    picId: number;
    publishTime: number;
    size: number;
    status: number;
};

/*
 *   //
 * */
type artist = {
    albumSize: number;
    alias: Array<unknown>;
    id: number;
    img1v1: number;
    img1v1Url: string;
    name: string;
    picId: number;
    picUrl: string;
    trans: string | number;
};

export interface KlyricResponse<T> {
    result: T
}

export interface Klyric {
    code: number;
    klyric: Lrc;
    lrc: Lrc;
    qfy: boolean;
    sfy: boolean;
    sgc: boolean;
    tlyric: Lrc;
}

export interface Lrc {
    lyric: string;
    version: number;
}
