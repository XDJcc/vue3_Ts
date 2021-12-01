import http from "@/utils/http";
import { Rows, Songs } from "@/api/cloudMusic/types";

const cloudBaseUrl = "https://autumnfish.cn/";
// const cloud = "/api";

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
  static async searchMusicDetail(params: { id: number }): Promise<unknown> {
    return await http.get(cloudBaseUrl + `/song/detail`, params);
  }

  /*
   * 获取音乐  -- 暂不可用
   * @Params: {id} : 音乐的ID
   * */
  static async getMusicUrl(params: { id: number }): Promise<unknown> {
    return await http.get(cloudBaseUrl + `/song/url`, params);
  }
}
