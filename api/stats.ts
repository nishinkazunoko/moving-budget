export async function GET() {
  const appId = process.env.estat_app_id
  if (!appId) {
    return Response.json({ error: 'e-Stat API ID is not configured' }, { status: 500 })
  }
  const url = new URL('https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData')
  url.searchParams.set('appId', appId)
  url.searchParams.set('lang', 'J')
  url.searchParams.set('statsDataId', '0003151330')
  url.searchParams.set('metaGetFlg', 'Y')
  url.searchParams.set('cntGetFlg', 'N')
  url.searchParams.set('explanationGetFlg', 'Y')
  url.searchParams.set('annotationGetFlg', 'Y')
  url.searchParams.set('sectionHeaderFlg', '1')
  url.searchParams.set('replaceSpChars', '0')
  const response = await fetch(url)
  const data = await response.json()
  return Response.json(data, { status: response.status })
}