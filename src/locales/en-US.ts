export default {
	common: {
		add: "Add",
		addSuccess: "Add Success",
		edit: "Edit",
		editSuccess: "Edit Success",
		delete: "Delete",
		deleteSuccess: "Delete Success",
		save: "Save",
		saveSuccess: "Save Success",
		reset: "Reset",
		action: "Action",
		export: "Export",
		exportSuccess: "Export Success",
		import: "Import",
		importSuccess: "Import Success",
		clear: "Clear",
		clearSuccess: "Clear Success",
		yes: "Yes",
		no: "No",
		confirm: "Confirm",
		download: "Download",
		noData: "No Data",
		wrong: "Something went wrong, please try again later.",
		success: "Success",
		failed: "Failed",
		verify: "Verify",
		unauthorizedTips: "Unauthorized, please verify first.",
		stopResponding: "Stop Responding",
	},
	chat: {
		newChatButton: "New Chat",
		//placeholder: 'Ask me anything...(Shift + Enter = line break, "/" to trigger prompts)',
		placeholder:
			'Ask me anything, or paste screenshots or drag the file .(Shift + Enter = line break, "/" to trigger prompts)',
		placeholderMobile: "Ask me anything...",
		copy: "Copy",
		copied: "Copied",
		copyCode: "Copy Code",
		clearChat: "Clear Chat",
		clearChatConfirm: "Are you sure to clear this chat?",
		exportImage: "Export Image",
		exportImageConfirm: "Are you sure to export this chat to png?",
		exportSuccess: "Export Success",
		exportFailed: "Export Failed",
		usingContext: "Context Mode",
		turnOnContext:
			"In the current mode, sending messages will carry previous chat records.",
		turnOffContext:
			"In the current mode, sending messages will not carry previous chat records.",
		deleteMessage: "Delete Message",
		deleteMessageConfirm: "Are you sure to delete this message?",
		deleteHistoryConfirm: "Are you sure to clear this history?",
		clearHistoryConfirm: "Are you sure to clear chat history?",
		preview: "Preview",
		showRawText: "Show as raw text",
	},
	setting: {
		setting: "Setting",
		general: "General",
		advanced: "Advanced",
		config: "Config",
		avatarLink: "Avatar Link",
		name: "Name",
		description: "Description",
		role: "Role",
		temperature: "Temperature",
		top_p: "Top_p",
		resetUserInfo: "Reset UserInfo",
		chatHistory: "ChatHistory",
		theme: "Theme",
		language: "Language",
		api: "API",
		reverseProxy: "Reverse Proxy",
		timeout: "Timeout",
		socks: "Socks",
		httpsProxy: "HTTPS Proxy",
		balance: "API Balance",
		monthlyUsage: "Monthly Usage",
	},
	store: {
		siderButton: "Prompt Store",
		local: "Local",
		online: "Online",
		title: "Title",
		description: "Description",
		clearStoreConfirm: "Whether to clear the data?",
		importPlaceholder: "Please paste the JSON data here",
		addRepeatTitleTips: "Title duplicate, please re-enter",
		addRepeatContentTips: "Content duplicate: {msg}, please re-enter",
		editRepeatTitleTips: "Title conflict, please revise",
		editRepeatContentTips: "Content conflict {msg} , please re-modify",
		importError: "Key value mismatch",
		importRepeatTitle: "Title repeatedly skipped: {msg}",
		importRepeatContent: "Content is repeatedly skipped: {msg}",
		onlineImportWarning: "Note: Please check the JSON file source!",
		downloadError: "Please check the network status and JSON file validity",
	},

	mj: {
		setOpen: "OpenAI Related",
		setOpenPlaceholder: "Must include http(s)://",
		setOpenUrl: "OpenAI API Address",
		setOpenKeyPlaceholder:
			"Use custom OpenAI Key to bypass password access restrictions",
		setMj: "Midjourney Related",
		setMjUrl: "Midjourney API Address:",
		setMjKeyPlaceholder:
			"Use custom Api Secret to bypass password access restrictions",
		setUploader: "Upload Related",
		setUploaderUrl: "Upload Address:",
		setBtSave: "Save",
		setBtBack: "Restore Default",

		redraw: "Redraw",
		fail1: "Please be patient, it's loading.",
		success1: "Image refreshed successfully!",
		high_variation: "Strong Variation",
		low_variation: "Weak Variation",
		p15: "Zoom 1.5x",
		p20: "Zoom 2x",
		p100: "Normal",
		retry: "Retry",
		pan_left: "Left",
		pan_right: "Right",
		pan_up: "Up",
		pan_down: "Down",
		up2: "HD 2x",
		up4: "HD 4x",

		thinking: "Thinking...",
		noReUpload: "Cannot re-upload",
		uploading: "Uploading...",
		uploadSuccess: "Upload successful",
		uploadFail: "Upload failed:",
		upPdf:
			"<span>Upload image or attachment<br/>You can upload images, PDFs, EXCEL, and other documents</span><p>Supports drag and drop</p>",
		upImg:
			'<span><b>Upload image</b><br/>Will automatically invoke the gpt-4-vision-preview model<br>Note: Additional image fees may apply<br/>Formats: jpeg, jpg, png, gif</span><p>Supports drag and drop</p> <p class="pt-2"><b>Upload MP3 MP4</b> <br>Will automatically invoke the whisper-1 model<br>Formats: mp3, mp4, mpeg, mpga, m4a, wav, webm</p>',
		clearAll: "Clear parameters",
		czoom: "Custom",
		customTitle: "Custom zoom",
		zoominfo: "Modify zoom value, range from 1.0 to 2.0, default is set to 1.8",

		modleSuccess: "Model loaded successfully",
		setingSuccess: "Settings successful",

		tokenInfo1:
			"Remaining Tokens = Model Length - Role Setting - Context (Conversation History) - Replies Count - Current Input",
		tokenInfo2:
			"Leave the role setting blank, and the system will provide a default one.",
		noSuppertModel: "Refresh, this model is not currently supported!",
		failOcr: "Recognition failed",
		remain: "Remain:",

		totalUsage: "Total subscription amount",
		disableGpt4: "GPT4 disabled",
		setTextInfo: "OpenAI API Key error, click here to retry",

		attr1: "Attr",
		ulink: "Image Link",
		copyFail: "Copy Failed",
		tts: "Text to Speech",
		fail: "Error",
		noSupperChrom: "Browser not supported!",
		lang: "Voice",
		ttsLoading: "Converting to Speech...",
		ttsSuccess: "Conversion successful",
		micIng: "Recording, say something...",
		mStart: "Start",
		mPause: "Pause",
		mGoon: "Continue",
		mRecord: "Re-record",
		mPlay: "Play",
		mCanel: "Cancel",
		mSent: "Send",

		findVersion: "Discover updated version",
		yesLastVersion: "Already on the latest version",
		infoStar:
			'This project is open source on <a class="text-blue-600 dark:text-blue-500" href="https://github.com/Dooy/chatgpt-web-midjourney-proxy" target="_blank">GitHub</a>, free, and based on the MIT license with no form of payment! </p><p>If you find this project helpful, please give it a Star on GitHub, thank you!',
		setBtSaveChat: "Save chat only",
		setBtSaveSys: "Save to system",
		wsrvClose: "Close wsrv",
		wsrvOpen: "Open wsrv",

		temperature: "Temperature",
		temperatureInfo:
			"As the (temperature) value increases, the responses become more random",
		top_p: "Top",
		top_pInfo:
			"(top_p) is similar to randomness but should not be changed together with temperature",
		presence_penalty: "Presence",
		presence_penaltyInfo:
			"As the (presence_penalty) value increases, there is a higher chance of expanding to new topics",
		frequency_penalty: "Frequency",
		frequency_penaltyInfo:
			"As the (frequency_penalty) value increases, there is a higher likelihood of reducing repeated words",
		tts_voice: "Voice Role",
		typing: "Typing",
		authErro: "Authorization failed",
		authBt: "Please enter the authorization access password again",
		micWhisper: "Whisper speech recognition",
		micAsr: "Instant recognition",
		micRec:
			"Start recording, please speak! It will automatically stop if there is no sound for 2 seconds.",
		micRecEnd: "Recording has ended",

		subtle: "High definition 2x",
		creative: "High definition 2x. Creative",
		gpt_gx: "GPTs use g-*",

		ideoabout: "About Ideogram",
		ideoserver: "Ideogram Server",
		ideokeyPlaceholder: "API Key for Ideogram (optional)",
		ideopls: "Image description prompts",
		nohead: "Excludes",

		klingabout: "Kling About",
		klingserver: "Kling API Address",
		klingkeyPlaceholder: "Kling API Key (optional)",
		klingkey: "Kling Key",
		mode: "Mode",
		duration: "Duration",
		negative_prompt: "Place text without objects here",
		std: "High Performance",
		pro: "High Quality",
		needImg: "Please upload a reference image for it to take effect!",
		seed: "Seed number 1~2147483647",
		klingInfo:
			"Description: <li>1. High Quality is 3.5 times the price</li> <li>2. 10s is 2 times the price</li> <li>3. The last frame must have a reference image to take effect</li>",

		camera_type: "Lens",
		cnull: "Smart Matching",
		down_back: "Move Down and Zoom Out",
		forward_up: "Push Forward and Move Up",
		right_turn_forward: "Turn Right and Push Forward",
		left_turn_forward: "Turn Left and Push Forward",
		kling: "Kling",

		rttab: "RealTime",
		rtinfo: "Realtime voice conversation service",
		rtsetting:
			"Please set the server. Currently, Realtime only supports remote services; for local services, please contact the author.",
		rjcloded: "Connection has been disconnected",
		checkkey: "Please check if the API key is correct",
		rtsuccess: "Connection is normal, maintaining the call",
		rtservererror: "WebSocket connection server error!",
		rtservererror2:
			"Recording is not supported, it may be due to device reasons!",
		rtconecting: "Connecting to the server",
		confirmDelete: "Are you sure?",
		pikaabout: "About Pika",
		pikaserver: "Pika API Address",
		pikakeyPlaceholder: "Pika API Key (optional)",
		createFail: "Creation failed",
		selecteff: "Reference Effect",
		udioabout: "About Udio",
		ud_prompt: "Prompt",
		ud_prompt_pls: "Prompt: Description, Style",
		ud_ly_write: "Write-Lyrics",
		ud_ly_auto: "Auto",
		ud_ly_null: "Instrumental",
		ud_v32: "Affordable",
		ud_v130: "Long Duration",
		ud_info: "Note: <ul><li>1. Udio-32 has a short duration</li><li>2. Udio-130 is twice the price of Udio-32</li><li>3. The prompt can include style, description, etc.</li></ul>",
		ud_fail: "Failed to generate this song!",
		ud_doing: "Cannot play while generating",
		ud_continuation: "Continuation",
		ud_precede: "Preced",
		upImg2: '<span><b>Upload Image</b><br/>This model supports image recognition<br>Note: There will be additional image fees<br/>Formats: jpeg jpg png gif</span><p>Supports drag and drop</p> <p class="pt-2"><b>Upload MP3 MP4</b> <br>Will automatically call the whisper-1 model<br>Formats include: mp3 mp4 mpeg mpga m4a wav webm</p>',
		rml_info: "Note:<ul><li>1. Must include an image</li><li>2. The model only has one gen3a_turbo</li><li>3. The price for 10s is double that of 5s</li></ul>",
		rml_heng: "Landscape",
		rml_shu: "Portrait", 
		pixabout: "Pixverse related",
		pixkeyPlaceholder: "Pixverse API Key can be left blank",
		pixserver: "Pixverse API address",
		pixinfo: " Description:<br> <ul> <li>1. Based on v3.5 360p duration 5s mode Normal</li><li>2. v2.5 is 0.5 times</li> <li>3. Duration 10s is 2 times</li> <li>4. 540P is 1.5 times, 720P is 2 times, 1080P is 4 times</li> <li>5. Mode performance is 2 times</li> <li>6. The multiples are multiplied, for example, 720P duration 10s is 2*2 which is 4 times, and if performance is added, it becomes 8 times</li></ul>",

		addGPTS: "Add GPTs",
		addPlaceholder:
			"Paste the GID of the GPTs here or directly paste the link of the GPTs",
		gidError: "Valid GID not found, please fill in again",
		success3: "GPTs added successfully!",
	},

	draw: {
		qualityList: {
			general: "General",
			clear: "Clear",
			hd: "HD",
			ultraHd: "Ultra HD",
		},
		styleList: {
			cyberpunk: "Cyberpunk",
			star: "Star",
			anime: "Anime",
			japaneseComicsManga: "Japanese Comics/Manga",
			inkWashPaintingStyle: "Ink Wash Painting Style",
			original: "Original",
			landscape: "Landscape",
			illustration: "Illustration",
			manga: "Manga",
			modernOrganic: "Modern Organic",
			genesis: "Genesis",
			posterstyle: "Poster Style",
			surrealism: "Surrealism",
			sketch: "Sketch",
			realism: "Realism",
			watercolorPainting: "Watercolor Painting",
			cubism: "Cubism",
			blackAndWhite: "Black and White",
			fmPhotography: "Film Photography Style",
			cinematic: "Cinematic",
			clearFacialFeatures: "Clear Facial Features",
		},
		viewList: {
			wideView: "Wide View",
			birdView: "Bird's Eye View",
			topView: "Top View",
			upview: "Upview",
			frontView: "Front View",
			headshot: "Headshot",
			ultrawideshot: "Ultrawide Shot",
			mediumShot: "Medium Shot (MS)",
			longShot: "Long Shot (LS)",
			depthOfField: "Depth of Field (DOF)",
		},
		shotList: {
			faceShot: "Face Shot (VCU)",
			bigCloseUp: "Big Close-Up (BCU)",
			closeUp: "Close-Up (CU)",
			waistShot: "Waist Shot (WS)",
			kneeShot: "Knee Shot (KS)",
			fullLengthShot: "Full Length Shot (FLS)",
			extraLongShot: "Extra Long Shot (ELS)",
		},
		stylesList: {
			styleLow: "Style Low",
			styleMed: "Style Medium",
			styleHigh: "Style High",
			styleVeryHigh: "Style Very High",
		},
		lightList: {
			coldLight: "Cold Light",
			warmLight: "Warm Light",
			hardLighting: "Hard Lighting",
			dramaticLight: "Dramatic Light",
			reflectionLight: "Reflection Light",
			mistyFoggy: "Misty/Foggy",
			naturalLight: "Natural Light",
			sunLight: "Sun Light",
			moody: "Moody",
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
			midjourneyBot: "Midjourney Bot",
			nijiJourney: "Niji Journey",
		},
		dimensionsList: {
			square: "Square (1:1)",
			portrait: "Portrait (2:3)",
			landscape: "Landscape (3:2)",
		},
	},

	suno: {
		description: "Description",
		custom: "Custom",
		style: "Song Style",
		stylepls: "Song Name, e.g., Pop Music",
		emputy: "No content available",
		noly: "No lyrics available",
		inputly: "Please enter the song name or lyrics",
		doingly: "In progress, please wait.",
		doingly2: "Fetching lyrics...",
		title: "Song Name",
		titlepls: "Song Name, e.g., Vacation",
		desc: "Song Description",
		descpls: "Song description, e.g., Original pop music about vacation",
		noneedly: "No lyrics needed",
		rank: "Random selection",
		ly: "Lyrics",
		lypls: "Lyrics: with a certain format",
		generate: "Compose Song",
		generately: "Generate Lyrics",
		nodata: "Please compose first to have a list of songs",

		menu: "Music",
		menuinfo: "Suno Music Creation",
		server: "Suno API Endpoint",
		serverabout: "Suno Related",
		setOpenKeyPlaceholder: "Related KEY for Suno API; optional",

		upMps: "Upload",
		extend: "Extend",
		extendFrom: "Extend From",
		extendAt: "Extend at",
		fail: "Fail",
		info: "Note: <br> Uploaded audio must be between 6 seconds and 60 seconds in duration.",
	},
	video: {
		menu: "Videos",
		menuinfo: "Luma and other video generate",
		descpls: "Video generate description",
		lumaabout: "About Luma",
		lumaserver: "Luma API endpoint",
		setOpenKeyPlaceholder: "Key for Luma API, optional",
		generate: "Generate video",
		nodata: "No available videos, please generate first!",
		selectimg: "Select image",
		clear: "Clear",
		plsInput: "Please input content!",
		submitSuccess: "Submitted successfully!",
		process: "Video generating...",
		repeat: "Get again",
		pending: "Status: Queued",
		processing: "Status: Processing",
		download: "Download",
		extend: "Extend",

		lumainfo:
			"Explanation: <ul><li>1. Pro and relax demo videos have watermarked links.</li><li>2. Pro without watermark requires obtaining the download link through the 'Download' button.</li><li>3. The links for Pro versions are time-limited; please save the MP4 file locally promptly.</li><li>4. For Pro versions, save the MP4 file locally within 30 minutes after generation, as the channel may be blocked or discontinued.</li><li>5. If the download link for Pro versions is invalid, a watermarked video link will be provided.</li></ul>",
		runwayabout: "Runway Related",
		runwayserver: "Runway API Endpoint",
		setOpenKeyPlaceholder2: "Runway API key, optional",
		endImg: "End Frame Image",
		runwayinfo:
			"Explanation: <ul><li>1. Runway images and videos have expiration times.</li><li>2. Please save the MP4 file locally within 30 minutes after generating the video.</li></ul>",
		nosup: "Not supported temporarily",
		rwgen2: "Version: Gen-2, cost-effective",
		rwgen3: "Version: Gen-3 Alpha",
		repeat2: "Expired.Reget",

		rwgen3turbo: "Version: Gen-3 Alpha Turbo",
		gen3a_turbo_img: "Gen-3 Alpha Turbo must image",
	},
	dance: {
		menu: "Dance",
		menuinfo: "Create dance videos with Viggle and others.",
		character: "Character",
		viggleabout: "About Viggle",
		viggleserver: "Viggle API Endpoint",
		setOpenKeyPlaceholder: "Viggle API key, optional",
		info: "Instructions:<br>1. Character images should preferably be full-body photos.<br>2. Dance template videos should be personal videos, not group dances.",
		model: "Model",
		bgw: "White Background",
		bgg: "Green Background",
		bgmoban: "Original Background",
		bgrole: "Character Background",
		gring: "Generating...",
		uprolefirst: "Please upload character image first",
		uprolefail: "Upload failed",
		upvideo: "+ Upload Template Dance Video",
		usevideo: "+ Use Official Template",
		moban: "Dance Template",
		moban2: "Template Name",
		use: "Use",
	},
}
