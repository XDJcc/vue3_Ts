import http from "@/utils/http";
import {Klyric, KlyricResponse, Rows, Songs} from "@/api/cloudMusic/types";

// const cloudBaseUrl = "https://autumnfish.cn/";
const cloudBaseUrl = "/api";

/**
 * 网易云音乐开放接口的数据
 */
export class CloudApi {
    /*
     * 搜索音乐
     * @Params: {keywords} : 关键字
     * */
    static async searchMusic(params: { keywords: string }) {
        const res = await http.reqGet<Rows<Songs>>(
            cloudBaseUrl + `/cloudsearch`,
            params
        );
        console.log(res)
        return res;
    }

    /*
     * 获取音乐详情
     * @Params: {ids} : 音乐ID
     * */
    static async searchMusicDetail(params: { ids: number }) {
        return await http.reqGet(cloudBaseUrl + `/song/detail`, params);
    }

    /*
     * 获取歌词
     * @Params: {id} : 音乐ID
     * */
    static async getMusicLyric(params: { id: number }) {
        const res = await http.reqGet<Klyric>(cloudBaseUrl + `/lyric`, params);
        return res;
    }

    /*
     * 获取音乐  -- 暂不可用
     * @Params: {id} : 音乐的ID
     * */
    static async getMusicUrl(params: { id: number }): Promise<unknown> {
        const res = await http.reqGet(cloudBaseUrl + `/song/url`, params);
        return res;
    }
}
