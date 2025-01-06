export default {
	common: {
		add: "新增",
		addSuccess: "新增成功",
		edit: "編輯",
		editSuccess: "編輯成功",
		delete: "刪除",
		deleteSuccess: "刪除成功",
		save: "儲存",
		saveSuccess: "儲存成功",
		reset: "重設",
		action: "操作",
		export: "匯出",
		exportSuccess: "匯出成功",
		import: "匯入",
		importSuccess: "匯入成功",
		clear: "清除",
		clearSuccess: "清除成功",
		yes: "是",
		no: "否",
		confirm: "確認",
		download: "下載",
		noData: "目前無資料",
		wrong: "發生錯誤，請稍後再試。",
		success: "操作成功",
		failed: "操作失敗",
		verify: "驗證",
		unauthorizedTips: "未經授權，請先進行驗證。",
		stopResponding: "停止回應",
	},
	chat: {
		newChatButton: "新增對話",
		//placeholder: '來說點什麼...（Shift + Enter = 換行，"/" 觸發提示詞）',
		placeholder:
			'可輸入說點什麼，也可貼截圖或拖拽檔案（Shift + Enter = 換行，"/" 觸發提示詞）',
		placeholderMobile: "來說點什麼...",
		copy: "複製",
		copied: "複製成功",
		copyCode: "複製代碼",
		clearChat: "清除對話",
		clearChatConfirm: "是否清空對話?",
		exportImage: "儲存對話為圖片",
		exportImageConfirm: "是否將對話儲存為圖片?",
		exportSuccess: "儲存成功",
		exportFailed: "儲存失敗",
		usingContext: "上下文模式",
		turnOnContext: "啟用上下文模式，在此模式下，發送訊息會包含之前的聊天記錄。",
		turnOffContext:
			"關閉上下文模式，在此模式下，發送訊息不會包含之前的聊天記錄。",
		deleteMessage: "刪除訊息",
		deleteMessageConfirm: "是否刪除此訊息?",
		deleteHistoryConfirm: "確定刪除此紀錄?",
		clearHistoryConfirm: "確定清除紀錄?",
		preview: "預覽",
		showRawText: "顯示原文",
	},
	setting: {
		setting: "設定",
		general: "總覽",
		advanced: "進階",
		config: "設定",
		avatarLink: "頭貼連結",
		name: "名稱",
		description: "描述",
		backgroundImage: "背景圖片",
		role: "角色設定",
		temperature: "Temperature",
		top_p: "Top_p",
		resetUserInfo: "重設使用者資訊",
		chatHistory: "紀錄",
		theme: "主題",
		language: "語言",
		api: "API",
		reverseProxy: "反向代理",
		timeout: "逾時",
		socks: "Socks",
		httpsProxy: "HTTPS Proxy",
		balance: "API Credit 餘額",
		monthlyUsage: "本月使用量",
	},
	store: {
		siderButton: "提示詞商店",
		local: "本機",
		online: "線上",
		title: "標題",
		description: "描述",
		clearStoreConfirm: "是否清除資料？",
		importPlaceholder: "請將 JSON 資料貼在此處",
		addRepeatTitleTips: "標題重複，請重新輸入",
		addRepeatContentTips: "內容重複：{msg}，請重新輸入",
		editRepeatTitleTips: "標題衝突，請重新修改",
		editRepeatContentTips: "內容衝突{msg} ，請重新修改",
		importError: "鍵值不符合",
		importRepeatTitle: "因標題重複跳過：{msg}",
		importRepeatContent: "因內容重複跳過：{msg}",
		onlineImportWarning: "注意：請檢查 JSON 檔案來源！",
		downloadError: "請檢查網路狀態與 JSON 檔案有效性",
	},

	mj: {
		setOpen: "OpenAI 相關",
		setOpenPlaceholder: "必須包含 http(s)://",
		setOpenUrl: "OpenAI接口地址",
		setOpenKeyPlaceholder: "使用自定義 OpenAI Key 繞過密碼訪問限制",
		setMj: "Midjourney 相關",
		setMjUrl: "Midjourney接口地址:",
		setMjKeyPlaceholder: "使用自定義 Api Secret 繞過密碼訪問限制",
		setUploader: "上傳相關",
		setUploaderUrl: "上傳地址:",
		setBtSave: "保存",
		setBtBack: "恢復默認",
		redraw: "局部重繪",
		fail1: "客官不要太急嘛，正在加載呢",
		success1: "圖片刷新成功！",
		high_variation: "強變化",
		low_variation: "弱變化",
		p15: "變焦1.5倍",
		p20: "變焦2倍",
		p100: "方正",
		retry: "重分析",
		pan_left: "向左",
		pan_right: "向右",
		pan_up: "向上",
		pan_down: "向下",
		up2: "高清2倍",
		up4: "高清4倍",

		thinking: "思考中...",
		noReUpload: "不能重複上傳",
		uploading: "上傳中...",
		uploadSuccess: "上傳成功",
		uploadFail: "上傳失敗:",
		upPdf:
			"<span>上傳圖片或附件<br/>可以上傳圖片、PDF、EXCEL等文檔</span><p>支持拖放</p>",
		upImg:
			'<span><b>上傳圖片</b><br/>將自動調用 gpt-4-vision-preview 模型<br>注意：可能會有額外的圖片費用<br/>格式：jpeg、jpg、png、gif</span><p>支持拖放</p> <p class="pt-2"><b>上傳MP3 MP4</b> <br>將自動直接調用 whisper-1 模型<br>格式：mp3、mp4、mpeg、mpga、m4a、wav、webm</p>',
		clearAll: "清參數",
		czoom: "自定義",
		customTitle: "自定義變焦",
		zoominfo: "修改zoom值，範圍在 1.0 到 2.0，默认设置為1.8",

		modleSuccess: "模型成功載入",
		setingSuccess: "設定成功",

		tokenInfo1:
			"剩餘Tokens = 模型長度 - 角色設定 - 上下文（對話歷史） - 回覆數 - 目前輸入",
		tokenInfo2: "保持角色設定為空，系統將提供默認值。",
		noSuppertModel: "刷新，目前不受此模型支持！",
		failOcr: "識別失敗",
		remain: "餘:",

		totalUsage: "訂閱總額",
		disableGpt4: "已禁用GPT4",
		setTextInfo: "OpenAI API Key 錯誤，點擊這裡重新",

		attr1: "附",
		ulink: "原圖鏈接",
		copyFail: "複製失敗",
		tts: "文字轉語音",
		fail: "發生錯誤",
		noSupperChrom: "瀏覽器不支援！",
		lang: "語音",
		ttsLoading: "轉換中...",
		ttsSuccess: "轉換成功",
		micIng: "錄音中，請說些什麼...",
		mStart: "開始",
		mPause: "暫停",
		mGoon: "繼續",
		mRecord: "重新錄製",
		mPlay: "播放",
		mCanel: "取消",
		mSent: "發送",
		findVersion: "發現更新版本",
		yesLastVersion: "已是最新版本",
		infoStar:
			'此專案在 <a class="text-blue-600 dark:text-blue-500" href="https://github.com/Dooy/chatgpt-web-midjourney-proxy" target="_blank">GitHub</a> 上以 MIT 協議開源，免費且沒有任何付費行為！ </p><p>如果你覺得這個專案對你有幫助，請在 GitHub 上給它一顆星，謝謝！',
		setBtSaveChat: "僅保存對話",
		setBtSaveSys: "保存至系統",
		wsrvClose: "關閉 wsrv",
		wsrvOpen: "開啟 wsrv",
		temperature: "隨機性",
		temperatureInfo: "隨著 (temperature) 值的增加，回覆變得更隨機",
		top_p: "概率抽樣",
		top_pInfo: "(top_p) 類似於隨機性，但不應與溫度一同更改",
		presence_penalty: "話題新鮮度",
		presence_penaltyInfo:
			"隨著 (presence_penalty) 值的增加，擴展到新話題的機會更高",
		frequency_penalty: "頻率懲罰",
		frequency_penaltyInfo:
			"隨著 (frequency_penalty) 值的增加，降低重複字詞的可能性更高",
		tts_voice: "TTS 語音角色",
		typing: "正在輸入",
		authErro: "授權失敗",
		authBt: "請重新輸入授權訪問密碼",
		micWhisper: "Whisper語音識別",
		micAsr: "即時識別",
		micRec: "開始錄音，請說話！2秒內無聲音將自動關閉",
		micRecEnd: "錄音已結束",
		subtle: "高清2倍",
		creative: "高清2倍. 創意",
		gpt_gx: "GPTs 用 g-*",
		ideoabout: "有關 Ideogram",
		ideoserver: "Ideogram 伺服器",
		ideokeyPlaceholder: "Ideogram 的 API 金鑰（可選）",
		ideopls: "圖片描述提示詞",
		nohead: "不含",

		klingabout: "可靈 相關",
		klingserver: "可靈 接口地址",
		klingkeyPlaceholder: "可靈 的API Key 可不填",
		klingkey: "可靈 Key",
		mode: "模式",
		duration: "時長",
		negative_prompt: "不含物體的文字放這裡",
		std: "高性能",
		pro: "高表現",
		needImg: "請傳參考圖才生效！",
		seed: "種子數字 1~2147483647",
		klingInfo:
			"說明： <li>1. 高表現是3.5倍的價格</li> <li>2. 10秒是2倍的價格</li> <li>3. 尾幀必須有參考圖片才生效</li>",
		camera_type: "鏡頭",
		cnull: "智能配對",
		down_back: "下移拉遠",
		forward_up: "推進上移",
		right_turn_forward: "右旋推進",
		left_turn_forward: "左旋推進",
		kling: "可灵",
		rttab: "語音",
		rtinfo: "實時語音對話服務(realtime)",
		rtsetting: "請設置服務器，目前Realtime僅支持遠程服務；需本地服務請聯繫作者",
		rjcloded: "連接已斷開",
		checkkey: "請檢查api key是否正確",
		rtsuccess: "連接正常保持通話",
		rtservererror: "websocket連接服務器錯誤！",
		rtservererror2: "不支持錄音，可能是設備原因！",
		rtconecting: "正在連接服務器",
		confirmDelete: "確認要刪除？",
		pikaabout: "Pika 相關",
		pikaserver: "Pika 接口地址",
		pikakeyPlaceholder: "Pika 的API Key 可不填",
		createFail: "生成失敗",
		selecteff: "參考效果",

		udioabout: "關於 Udio",
		udiokeyPlaceholder: "Udio API 金鑰（可選）",
		udioserver: "Udio 接口地址",
		ud_prompt: "提示詞",
		ud_prompt_pls: "提示詞：描述、風格",
		ud_ly_write: "自訂歌詞",
		ud_ly_auto: "智能歌詞",
		ud_ly_null: "純音樂",
		ud_v32: "實惠",
		ud_v130: "時間長",
		ud_info:
			"注意：<ul><li>1. Udio-32 時長短</li><li>2. Udio-130 價格是 Udio-32 的兩倍</li><li>3. 提示詞內可以放風格、描述等</li></ul>",
		ud_fail: "這首歌生成失敗！",
		ud_doing: "生成中無法播放",
		ud_continuation: "後擴展",
		ud_precede: "前擴展",

		upImg2:
			'<span><b>上載圖片</b><br/>該模型支持識圖<br>注意：會有額外的圖片費用<br/>格式：jpeg jpg png gif</span><p>支持拖曳</p> <p class="pt-2"><b>上載MP3 MP4</b> <br>會自動直接調用 whisper-1 模型<br>格式包括：mp3 mp4 mpeg mpga m4a wav webm</p>',
		rml_info:
			"注意：<ul><li>1. 必須帶圖</li><li>2. 模型只有一個 gen3a_turbo</li><li>3. 10秒的價格是5秒的雙倍</li></ul>",
		rml_heng: "橫屏",
		rml_shu: "豎屏",
	},
	mjset: {
		server: "服務端",
		about: "關於",
		model: "模型",
		sysname: "AI繪圖",
	},
	mjtab: {
		chat: "對話",
		draw: "繪畫",
		drawinfo: "AI繪畫 Midjourney引擎",
		gallery: "畫廊",
		galleryInfo: "我的畫廊",
	},
	mjchat: {
		loading: "正在載入圖片",
		openurl: "直接打開鏈接",
		failReason: "失敗原因：",
		reload: "重新獲取",
		progress: "進度：",
		wait: "任務已經提交請等待...",
		reroll: "重繪",
		wait2: "任務 {id} 已經提交請等待",
		redrawEditing: "局部重繪編輯",
		face: "換臉",
		blend: "混圖",
		draw: "繪圖",
		submiting: "提交中",
		submit: "提交",
		wait3: "請勿關閉! 圖片生成中...",
		success: "保存成功",
		successTitle: "成功",
		modlePlaceholder: "自定義模型多個用空格隔開，不是必須",
		myModle: "自定義模型",
		historyCnt: "上下文數量",
		historyToken: "更多的上下文會使記憶更精確，但會消耗更多的額度",
		historyTCnt: "回復數",
		historyTCntInfo: "回復數越大 ,越有可能消耗更多的額度",
		role: "角色設定",
		rolePlaceholder: "給你的會話設置一個專屬的角色，不是必須",
		loading2: "正在加載...",
		loadmore: "加載更多",
		nofind: "未能找到",
		nofind2: "相關內容, 你可嘗試以下內容",
		success2: "切換成功！",
		modelChange: "模型切換",
		search: "搜索",
		searchPlaceholder: "GPTs名字、介紹",
		attr: "附件",
		noproduct: "畫廊還沒有您的作品",
		myGallery: "我的畫廊",
		yourHead: "你的頭像",
		your2Head: "明星圖",
		tipInfo:
			"說明：<li>1 圖片都必須包含臉，否則出不來圖</li> <li>2 “明星圖”可以先用mj繪畫製作出來</li> <li>3 “明星圖”其實動漫圖也行</li> <li>4 “你的頭像”建議用一寸個人照</li>",
		placeInput: "請填寫提示詞！",
		more5sb: "最多上傳5張圖片",
		exSuccess: "導出成功... 請看下載欄",
		downloadSave: "ai繪畫.txt",
		noproducet: "暫時沒成熟作品",
		imgBili: "圖片比例",
		imagEx: "作品圖片鏈接導出",
		prompt: "提示詞",
		imgCYes: "含有墊圖",
		imgCUpload: "自傳墊圖",
		imgCInfo:
			"墊圖說明：<br/> 1.墊圖可使用自己的圖片作為基礎，讓MJ來繪圖<br/> 2.可以使用多張墊圖 最多5張， 單張圖片不超過1M<br/>",
		imgCadd: "+添加",
		del: "刪除",
		img2text: "圖生文",
		img2textinfo: "不知如何寫提示詞？用圖生文試試！<br/>提交圖片，出提示詞",
		traning: "翻譯中...",
		imgcreate: "生成圖片",
		imginfo:
			"其他參數：  <li>1 --no 忽略 --no car 圖中不出現車 </li><li>2 --seed 可先獲取種子 --seed 123456 </li> <li>3 --chaos 10 混合(範圍：0-100)</li> <li>4 --tile 碎片化 </li> ",
		tStyle: "風格",
		tView: "視角",
		tShot: "人物鏡頭",
		tLight: "燈光",
		tQuality: "畫質",
		tStyles: "藝術程度",
		version: "版本",
		size: "尺寸",
		blendInfo: "說明： <li>1 合成至少2張圖片</li> <li>2 最多可傳6張圖</li> ",
		blendStart: "開始合成",
		no2add: "請勿重複添加圖片",
		add2more: "請添加兩張以上圖片",
		no1m: "圖片大小不能超過1M",
		imgExt: "圖片僅支持jpg,gif,png,jpeg格式",
		setSync: "同步Midjourney和Suno",
		addGPTS: "新增 GPTs",
		addPlaceholder: "將 GPTs 的 gid 貼這裡 也可直接貼 GPTs 的鏈接",
		gidError: "未找到有效的 gid，请重新填寫",
		success3: "新增 GPTs 成功！",
	},
	draw: {
		qualityList: {
			general: "一般",
			clear: "清晰",
			hd: "高清",
			ultraHd: "超高清",
		},
		styleList: {
			cyberpunk: "賽博朋克",
			star: "星際",
			anime: "動漫",
			japaneseComicsManga: "日本漫畫",
			inkWashPaintingStyle: "水墨畫風格",
			original: "原創",
			landscape: "風景畫",
			illustration: "插畫",
			manga: "漫畫",
			modernOrganic: "現代自然",
			genesis: "創世紀",
			posterstyle: "海報風格",
			surrealism: "超現實主義",
			sketch: "素描",
			realism: "寫實",
			watercolorPainting: "水彩畫",
			cubism: "立體主義",
			blackAndWhite: "黑白",
			fmPhotography: "膠片攝影風格",
			cinematic: "電影化",
			clearFacialFeatures: "清晰的面部特徵",
		},
		viewList: {
			wideView: "寬視角",
			birdView: "鳥瞰視角",
			topView: "頂視角",
			upview: "仰視角",
			frontView: "正面視角",
			headshot: "頭部特寫",
			ultrawideshot: "超廣角視角",
			mediumShot: "中景",
			longShot: "遠景",
			depthOfField: "景深",
		},
		shotList: {
			faceShot: "臉部特寫",
			bigCloseUp: "大特寫",
			closeUp: "特寫",
			waistShot: "腰部以上",
			kneeShot: "膝蓋以上",
			fullLengthShot: "全身照",
			extraLongShot: "極遠景",
		},
		stylesList: {
			styleLow: "低強度風格",
			styleMed: "中等強度風格",
			styleHigh: "高強度風格",
			styleVeryHigh: "非常高強度風格",
		},
		lightList: {
			coldLight: "冷光",
			warmLight: "暖光",
			hardLighting: "硬光",
			dramaticLight: "戲劇性光線",
			reflectionLight: "反射光",
			mistyFoggy: "薄霧",
			naturalLight: "自然光",
			sunLight: "陽光",
			moody: "情緒化",
		},
		versionList: {
			mjV6: "MJ V6",
			mjV61: "MJ V6.1",
			mjV52: "MJ V5.2",
			mjV51: "MJ V5.1",
			nijiV6: "Niji V6",
			nijiV5: "Niji V5",
			nijiV4: "Niji V4",
			nijiJourney: "Niji Journey",
		},
		botList: {
			midjourneyBot: "Midjourney 機器人",
			nijiJourney: "Niji Journey",
		},
		dimensionsList: {
			square: "正方形 (1:1)",
			portrait: "肖像 (2:3)",
			landscape: "風景 (3:2)",
		},
	},
	suno: {
		description: "描述模式",
		custom: "專業模式",
		style: "歌曲風格",
		stylepls: "歌曲名稱，例如：流行音樂",
		emputy: "暫無內容",
		noly: "無歌詞",
		inputly: "請輸入歌曲名稱或歌詞",
		doingly: "正在進行中，請稍候。",
		doingly2: "正在獲取歌詞...",
		title: "歌曲名稱",
		titlepls: "歌曲名稱，例如：假期",
		desc: "歌曲描述",
		descpls: "歌曲描述，例如：關於假期的原聲流行音樂",
		noneedly: "無需歌詞",
		rank: "隨機獲取",
		ly: "歌詞",
		lypls: "歌詞：有一定的格式",
		generate: "創作歌曲",
		generately: "生成歌詞",
		nodata: "請先創作才有歌曲列表",

		menu: "音樂",
		menuinfo: "Suno 音樂創作",
		server: "Suno API 端點",
		serverabout: "Suno 相關",
		setOpenKeyPlaceholder: "Suno API 的相關KEY；可不填",

		upMps: "上載音頻",
		extend: "擴展",
		extendFrom: "擴展自",
		extendAt: "擴展始於",
		fail: "失敗",
		info: "說明：<br>上載音頻的持續時間必須在6秒到60秒之間",
	},
	video: {
		menu: "視頻",
		menuinfo: "Luma及其他視頻創作",
		descpls: "視頻創作描述",
		lumaabout: "關於Luma",
		lumaserver: "Luma API端點",
		setOpenKeyPlaceholder: "Luma API金鑰，選填",
		generate: "生成視頻",
		nodata: "暫無可用視頻，請先生成！",
		selectimg: "選擇圖片",
		clear: "清除",
		plsInput: "請輸入內容！",
		submitSuccess: "提交成功！",
		process: "視頻生成中...",
		repeat: "重新獲取",

		lumainfo:
			"說明：<ul><li>1. Pro 和 relax 演示視頻都有水印的鏈接</li><li>2. Pro 無水印版本需要通過「下載按鈕」得到下載鏈接</li><li>3. Pro 得到的鏈接有時限；請及時保存 MP4 文件到本地</li><li>4. Pro 請在生成後的 30 分鐘內；將 MP4 保存到本地，渠道號也可能被封或者下線</li><li>5. Pro 當下載鏈接無效時會給出帶水印的視頻鏈接</li></ul>",
		runwayabout: "Runway 相關",
		runwayserver: "Runway 接口地址",
		setOpenKeyPlaceholder2: "Runway API 的key, 可不填",
		endImg: "尾幀圖",
		runwayinfo:
			"說明：<ul><li>1. Runway 圖片與視頻都有有效期</li><li>2. 請在生成視頻後 30 分鐘內將 MP4 保存到本地</li></ul>",
		nosup: "暫不支持",
		rwgen2: "版本: Gen-2, 價格實惠",
		rwgen3: "版本: Gen-3 Alpha",
		repeat2: "Expired.Reget",

		rwgen3turbo: "版本: Gen-3 Alpha Turbo",
		gen3a_turbo_img: "Gen-3 Alpha Turbo 必须带图",
	},
	dance: {
		menu: "跳舞",
		menuinfo: "使用 Viggle 等創作舞蹈影片。",
		character: "人物角色",
		viggleabout: "關於 Viggle",
		viggleserver: "Viggle API 接口地址",
		setOpenKeyPlaceholder: "Viggle API 的 key，可選填",
		info: "說明：<br>1. 角色圖片最好是全身照片。<br>2. 舞蹈模板影片最好是個人影片，不要是團體舞蹈。",
		model: "模型",
		bgw: "白色背景",
		bgg: "綠色背景",
		bgmoban: "模板背景",
		bgrole: "角色背景",
		gring: "生成中...",
		uprolefirst: "請先上傳角色圖片",
		uprolefail: "上傳失敗",
		upvideo: "+ 上傳模板跳舞影片",
		usevideo: "+ 使用官方模板",
		moban: "跳舞模板",
		moban2: "模板名稱",
		use: "使用",
	},
}
