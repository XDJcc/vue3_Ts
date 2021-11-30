import http from "@/utils/http";
import { Rows, Songs } from "@/views/cloud/types";
const cloudBaseUrl = "https://autumnfish.cn/";
/*
 * 搜索音乐
 * @Params: {keywords} : 关键字
 * */

export async function searchMusic(params: {
  keywords: string;
}): Promise<Rows<Songs>> {
  // @ts-ignore
  return await http.get(cloudBaseUrl + `/search`, params);
}
/*
 * 获取音乐详情
 * @Params: {ids} : 音乐ID
 * */

export async function searchMusicDetail(params: {
  keywords: string;
}): Promise<unknown> {
  return await http.get(cloudBaseUrl + `/api/song/detail`, params);
}

/*
 * 获取音乐  -- 暂不可用
 * @Params: {id} : 音乐的ID
 * */

export async function getMusicUrl(params: { id: number }): Promise<unknown> {
  return await http.get(cloudBaseUrl + `/api/song/url`, params);
}
