import KyveSDK from "../dist/index" ;
const MNEMONIC =
	"vacant vivid bench divorce expire math fix method foam industry clinic machine";
(async function main() {
	const sdk = new KyveSDK('korellia');
	const kyveClient = await sdk.fromMnemonic(MNEMONIC)
	const r = await kyveClient.nativeClient.getChainId()
	console.log(r);
})()
