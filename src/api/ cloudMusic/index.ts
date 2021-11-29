import http from "@/utils/http";

/*
 * 搜索音乐
 * @Params: {keywords} : 关键字
 * */

export async function searchMusic(params:{keywords:string}) {
  return await http.get(`/api/search`, params);
}
/*
 * 获取音乐
 * @Params: {id} : 音乐的ID
 * */

export async function getMusicUrl(params:{id:number}) {
  return await http.get(`/api/song/url`, params);
}
