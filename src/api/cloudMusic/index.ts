import http from "@/utils/http";
import { Rows , Songs } from "@/api/cloudMusic/types.ts";

const cloudBaseUrl = "https://autumnfish.cn/";
// const cloud = "/api";

interface Klyric {
  code: number;
  klyric: Lrc;
  lrc: Lrc;
  qfy: boolean;
  sfy: boolean;
  sgc: boolean;
  tlyric: Lrc;
}
interface Lrc {
  lyric: string;
  version: number;
};

/**
 * 网易云音乐开放接口的数据
 */
export class CloudApi {
  /*
   * 搜索音乐
   * @Params: {keywords} : 关键字
   * */
  static async searchMusic(params: { keywords: string }): Promise<Rows<Songs>> {
    const res = await http.reqGet<Rows<Songs>>(
      cloudBaseUrl + `/search`,
      params
    );
    return res.data;
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
  static async getMusicLyric(params: { id: number }){
    return await http.reqGet(cloudBaseUrl + `/lyric`, params);
  }

  /*
   * 获取音乐  -- 暂不可用
   * @Params: {id} : 音乐的ID
   * */
  static async getMusicUrl(params: { id: number }): Promise<unknown> {
    return await http.reqGet(cloudBaseUrl + `/song/url`, params);
  }
}
