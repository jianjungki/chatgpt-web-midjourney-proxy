export default {
	common: {
		add: "Ajouter",
		addSuccess: "Ajout réussi",
		edit: "Éditer",
		editSuccess: "Édition réussie",
		delete: "Supprimer",
		deleteSuccess: "Suppression réussie",
		save: "Enregistrer",
		saveSuccess: "Enregistrement réussi",
		reset: "Réinitialiser",
		action: "Action",
		export: "Exporter",
		exportSuccess: "Exportation réussie",
		import: "Importer",
		importSuccess: "Importation réussie",
		clear: "Effacer",
		clearSuccess: "Effacement réussi",
		yes: "Oui",
		no: "Non",
		confirm: "Confirmer",
		download: "Télécharger",
		noData: "Pas de données",
		wrong: "Quelque chose s'est mal passé, veuillez réessayer plus tard.",
		success: "Succès",
		failed: "Échec",
		verify: "Vérifier",
		unauthorizedTips: "Non autorisé, veuillez vérifier d'abord.",
		stopResponding: "Arrêter de répondre",
	},
	chat: {
		newChatButton: "Nouveau Chat",
		//placeholder: 'Ask me anything...(Shift + Enter = line break, "/" to trigger prompts)',
		placeholder:
			"Posez-moi n'importe quoi, ou collez des captures d'écran ou faites glisser le fichier. (Shift + Enter = saut de ligne, \"/\" pour déclencher des prompts)",
		placeholderMobile: "Posez-moi n'importe quoi...",
		copy: "Copier",
		copied: "Copié",
		copyCode: "Copier le Code",
		clearChat: "Effacer le Chat",
		clearChatConfirm: "Êtes-vous sûr de vouloir effacer ce chat ?",
		exportImage: "Exporter l'Image",
		exportImageConfirm: "Êtes-vous sûr de vouloir exporter ce chat en PNG ?",
		exportSuccess: "Exportation réussie",
		exportFailed: "Échec de l'exportation",
		usingContext: "Mode Contexte",
		turnOnContext:
			"Dans le mode actuel, l'envoi de messages conservera les enregistrements de chat précédents.",
		turnOffContext:
			"Dans le mode actuel, l'envoi de messages ne conservera pas les enregistrements de chat précédents.",
		deleteMessage: "Supprimer le Message",
		deleteMessageConfirm: "Êtes-vous sûr de vouloir supprimer ce message ?",
		deleteHistoryConfirm: "Êtes-vous sûr de vouloir effacer cet historique ?",
		clearHistoryConfirm:
			"Êtes-vous sûr de vouloir effacer l'historique du chat ?",
		preview: "Aperçu",
		showRawText: "Afficher en texte brut",
	},
	setting: {
		setting: "Paramètres",
		general: "Général",
		advanced: "Avancé",
		config: "Configuration",
		avatarLink: "Lien de l'Avatar",
		name: "Nom",
		description: "Description",
		backgroundImage: "Image de Fond",
		role: "Rôle",
		temperature: "Température",
		top_p: "Top_p",
		resetUserInfo: "Réinitialiser les Infos Utilisateur",
		chatHistory: "Historique du Chat",
		theme: "Thème",
		language: "Langue",
		api: "API",
		reverseProxy: "Proxy Inverse",
		timeout: "Délai d'Attente",
		socks: "Socks",
		httpsProxy: "Proxy HTTPS",
		balance: "Solde de l'API",
		monthlyUsage: "Utilisation Mensuelle",
	},
	store: {
		siderButton: "Prompt Boutique",
		local: "Local",
		online: "En ligne",
		title: "Titre",
		description: "Description",
		clearStoreConfirm: "Voulez-vous vraiment effacer les données ?",
		importPlaceholder: "Veuillez coller les données JSON ici",
		addRepeatTitleTips: "Titre en double, veuillez le saisir à nouveau",
		addRepeatContentTips:
			"Contenu en double : {msg}, veuillez le saisir à nouveau",
		editRepeatTitleTips: "Conflit de titre, veuillez le réviser",
		editRepeatContentTips:
			"Conflit de contenu {msg}, veuillez le modifier à nouveau",
		importError: "Incompatibilité de valeur clé",
		importRepeatTitle: "Titre ignoré de manière répétée : {msg}",
		importRepeatContent: "Contenu ignoré de manière répétée : {msg}",
		onlineImportWarning:
			"Remarque : Veuillez vérifier la source du fichier JSON !",
		downloadError:
			"Veuillez vérifier l'état du réseau et la validité du fichier JSON",
	},
	mj: {
		setOpen: "Lié à OpenAI",
		setOpenPlaceholder: "Doit inclure http(s)://",
		setOpenUrl: "Adresse de l'API OpenAI",
		setOpenKeyPlaceholder:
			"Utilisez une clé OpenAI personnalisée pour contourner les restrictions d'accès par mot de passe",
		setMj: "Lié à Midjourney",
		setMjUrl: "Adresse de l'API Midjourney:",
		setMjKeyPlaceholder:
			"Utilisez une clé d'API Midjourney personnalisée pour contourner les restrictions d'accès par mot de passe",
		setUploader: "Lié au Téléchargement",
		setUploaderUrl: "Adresse de Téléchargement:",
		setBtSave: "Enregistrer",
		setBtBack: "Restaurer les Paramètres par Défaut",

		redraw: "Redessiner",
		fail1: "S'il vous plaît soyez patient, ça charge.",
		success1: "Image rafraîchie avec succès !",
		high_variation: "Variation Forte",
		low_variation: "Variation Faible",
		p15: "Zoom 1.5x",
		p20: "Zoom 2x",
		p100: "Normal",
		retry: "Réessayer",
		pan_left: "Gauche",
		pan_right: "Droite",
		pan_up: "Haut",
		pan_down: "Bas",
		up2: "HD 2x",
		up4: "HD 4x",

		thinking: "Réflexion...",
		noReUpload: "Impossible de réimporter",
		uploading: "Téléchargement...",
		uploadSuccess: "Téléchargement réussi",
		uploadFail: "Échec du téléchargement:",
		upPdf:
			"<span>Téléchargez une image ou une pièce jointe<br/>Vous pouvez télécharger des images, des PDF, des EXCEL et d'autres documents</span><p>Prise en charge du glisser-déposer</p>",
		upImg:
			'<span><b>Téléchargez une image</b><br/>Il invoquera automatiquement le modèle de prévisualisation gpt-4-vision<br>Remarque : Des frais supplémentaires peuvent s\'appliquer pour les images supplémentaires<br/>Formats : jpeg, jpg, png, gif</span><p>Prise en charge du glisser-déposer</p> <p class="pt-2"><b>Téléchargez MP3 MP4</b> <br>Il invoquera automatiquement le modèle whisper-1<br>Formats : mp3, mp4, mpeg, mpga, m4a, wav, webm</p>',
		clearAll: "Effacer les paramètres",
		czoom: "Personnalisé",
		customTitle: "Zoom personnalisé",
		zoominfo:
			"Modifier la valeur du zoom, de 1.0 à 2.0, la valeur par défaut est réglée sur 1.8",

		modleSuccess: "Modèle chargé avec succès",
		setingSuccess: "Paramètres réussis",

		tokenInfo1:
			"Jetons restants = Longueur du modèle - Réglage du rôle - Contexte (historique des conversations) - Nombre de réponses - Entrée actuelle",
		tokenInfo2:
			"Laissez le réglage du rôle vide et le système fournira un réglage par défaut.",
		noSuppertModel:
			"Actualiser, ce modèle n'est actuellement pas pris en charge !",
		failOcr: "Échec de la reconnaissance",
		remain: "Reste :",

		totalUsage: "Montant total de l'abonnement",
		disableGpt4: "GPT4 désactivé",
		setTextInfo: "Erreur de clé API OpenAI, cliquez ici pour réessayer",

		attr1: "Attribut",
		ulink: "Lien de l'image",
		copyFail: "Copie échouée",
		tts: "Texte vers Parole",
		fail: "Erreur",
		noSupperChrom: "Navigateur non pris en charge !",
		lang: "Voix",
		ttsLoading: "Conversion en discours...",
		ttsSuccess: "Conversion réussie",
		micIng: "Enregistrement, dites quelque chose...",
		mStart: "Démarrer",
		mPause: "Pause",
		mGoon: "Continuer",
		mRecord: "Réenregistrer",
		mPlay: "Lire",
		mCanel: "Annuler",
		mSent: "Envoyer",

		findVersion: "Découvrir la version mise à jour",
		yesLastVersion: "Déjà sur la dernière version",
		infoStar:
			'Ce projet est open source sur <a class="text-blue-600 dark:text-blue-500" href="https://github.com/Dooy/chatgpt-web-midjourney-proxy\" target="_blank">GitHub</a>, gratuit et basé sur la licence MIT sans aucune forme de paiement ! </p><p>Si vous trouvez ce projet utile, veuillez lui donner une étoile sur GitHub, merci !',
		setBtSaveChat: "Enregistrer le chat seulement",
		setBtSaveSys: "Enregistrer dans le système",
		wsrvClose: "Fermer wsrv",
		wsrvOpen: "Ouvrir wsrv",

		temperature: "Aléatoire",
		temperatureInfo:
			"À mesure que la valeur de (temperature) augmente, les réponses deviennent plus aléatoires",
		top_p: "Échantillonnage de probabilité supérieure",
		top_pInfo:
			"(top_p) est similaire à l'aléatoire mais ne doit pas être modifié en même temps que la température",
		presence_penalty: "Fraîcheur du sujet",
		presence_penaltyInfo:
			"À mesure que la valeur de (presence_penalty) augmente, il y a plus de chances de s'étendre à de nouveaux sujets",
		frequency_penalty: "Pénalité de fréquence",
		frequency_penaltyInfo:
			"À mesure que la valeur de (frequency_penalty) augmente, il y a plus de chances de réduire les mots répétés",
		tts_voice: "Personnage vocal TTS",
		typing: "En train d'écrire",
		authErro: "Échec de l'autorisation",
		authBt:
			"Veuillez saisir à nouveau le mot de passe d'accès à l'autorisation",
		micWhisper: "Reconnaissance vocale chuchotement",
		micAsr: "Reconnaissance instantanée",
		micRec:
			"Commencer l'enregistrement, s'il vous plaît parlez ! Il s'arrêtera automatiquement s'il n'y a pas de son pendant 2 secondes.",
		micRecEnd: "L'enregistrement est terminé",

		subtle: "Haute définition 2x",
		creative: "Haute définition 2x. Créatif",
		gpt_gx: "Les GPT utilisent g-*",

		ideoabout: "À propos d'Ideogram",
		ideoserver: "Serveur Ideogram",
		ideokeyPlaceholder: "Clé API pour Ideogram (optionnelle)",
		ideopls: "Invites de description d'image",
		nohead: "Exclut",

		klingabout: "Kling À propos",
		klingserver: "Adresse API Kling",
		klingkeyPlaceholder: "Clé API Kling (facultatif)",
		klingkey: "Clé Kling",
		mode: "Mode",
		duration: "Durée",
		negative_prompt: "Mettez le texte sans objets ici",
		std: "Haute performance",
		pro: "Haute qualité",
		needImg:
			"Veuillez télécharger une image de référence pour qu’elle prenne effet !",
		seed: "Numéro de graine 1~2147483647",
		klingInfo:
			"Description : <li>1. Haute qualité coûte 3,5 fois le prix</li> <li>2. 10 secondes coûtent 2 fois le prix</li> <li>3. La dernière image doit avoir une image de référence pour prendre effet</li>",

		camera_type: "Objectif",
		cnull: "Correspondance intelligente",
		down_back: "Descendre et zoomer",
		forward_up: "Avancer et monter",
		right_turn_forward: "Tourner à droite et avancer",
		left_turn_forward: "Tourner à gauche et avancer",
		kling: "Kling",
		rttab: "Voix",
		rtinfo: "Service de conversation vocale en temps réel (realtime)",
		rtsetting:
			"Veuillez configurer le serveur. Actuellement, Realtime ne prend en charge que les services à distance ; pour les services locaux, veuillez contacter l'auteur.",
		rjcloded: "La connexion a été déconnectée",
		checkkey: "Veuillez vérifier si la clé API est correcte",
		rtsuccess: "Connexion normale, maintien de l'appel",
		rtservererror: "Erreur de connexion au serveur WebSocket !",
		rtservererror2:
			"Enregistrement non pris en charge, cela peut être dû à un problème de matériel !",
		rtconecting: "Connexion au serveur en cours",
		confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
		pikaabout: "À propos de Pika",
		pikaserver: "Adresse API Pika",
		pikakeyPlaceholder: "Clé API Pika (facultatif)",
		createFail: "Échec de la création",
		selecteff: "Effet de référence",

		udioabout: "À propos de Udio",
		udiokeyPlaceholder: "Clé API Udio (optionnelle)",
		udioserver: "Adresse API Udio",
		ud_prompt: "Invite",
		ud_prompt_pls: "Invite : Description, Style",
		ud_ly_write: "Paroles personnalisées",
		ud_ly_auto: "Paroles intelligentes",
		ud_ly_null: "Musique pure",
		ud_v32: "Abordable",
		ud_v130: "Longue durée",
		ud_info:
			"Remarque : <ul><li>1. Udio-32 a une durée courte</li><li>2. Udio-130 coûte le double de Udio-32</li><li>3. L'invite peut inclure style, description, etc.</li></ul>",
		ud_fail: "Échec de la génération de cette chanson !",
		ud_doing: "Impossible de lire pendant la génération",
		ud_continuation: "Continuation",
		ud_precede: "Précédent",

		upImg2:
			'<span><b>Télécharger une image</b><br/>Ce modèle prend en charge la reconnaissance d\'images<br>Remarque : des frais supplémentaires pour les images seront appliqués<br/>Formats : jpeg jpg png gif</span><p>Prend en charge le glisser-déposer</p> <p class="pt-2"><b>Télécharger MP3 MP4</b> <br>Appellera automatiquement le modèle whisper-1<br>Formats : mp3 mp4 mpeg mpga m4a wav webm</p>',
		rml_info:
			"Remarque :<ul><li>1. Doit inclure une image</li><li>2. Le modèle n'a qu'un seul gen3a_turbo</li><li>3. Le prix pour 10 secondes est le double de celui de 5 secondes</li></ul>",
		rml_heng: "Paysage",
		rml_shu: "Portrait",
	},
	mjset: {
		server: "Serveur",
		about: "À Propos",
		model: "Modèle",
		sysname: "Dessin AI",
	},
	mjtab: {
		chat: "Chat",
		draw: "Dessin",
		drawinfo: "Dessin AI avec le Moteur Midjourney",
		gallery: "Galerie",
		galleryInfo: "Ma Galerie",
	},
	mjchat: {
		loading: "Chargement de l'Image",
		openurl: "Ouvrir le lien directement",
		failReason: "Raison de l'échec:",
		reload: "Recharger",
		progress: "Progression:",
		wait: "La tâche a été soumise, veuillez patienter...",
		reroll: "Refaire",
		wait2: "La tâche {id} a été soumise, veuillez patienter",
		redrawEditing: "Édition partielle du Redraw",
		face: "Changer de Visage",
		blend: "Mélanger les Images",
		draw: "Dessin",
		submiting: "Soumission",
		submit: "Soumettre",
		wait3: "Veuillez ne pas fermer! L'image est en cours de génération...",
		success: "Enregistrement réussi",
		successTitle: "Succès",
		modlePlaceholder:
			"Modèles personnalisés, séparés par des espaces (facultatif)",
		myModle: "Modèles Personnalisés",
		historyCnt: "Nombre de Contextes",
		historyToken:
			"Plus de contexte améliore la précision mais consomme plus de crédits",
		historyTCnt: "Nombre de Réponses",
		historyTCntInfo:
			"Un nombre plus élevé de réponses peut consommer plus de crédits",
		role: "Paramètre de Rôle",
		rolePlaceholder:
			"Définissez un rôle exclusif pour votre conversation (facultatif)",
		loading2: "Chargement...",
		loadmore: "Charger Plus",
		nofind: "Impossible de trouver",
		nofind2: "contenu connexe. Vous pouvez essayer ce qui suit:",
		success2: "Changement réussi!",
		modelChange: "Changement de Modèle",
		search: "Rechercher",
		searchPlaceholder: "Noms GPT, descriptions",
		attr: "Pièces Jointes",
		noproduct: "La galerie n'a pas encore d'entrées",
		myGallery: "Ma Galerie",
		yourHead: "Votre Avatar",
		your2Head: "Image de Célébrité",
		tipInfo:
			"Note:<li>1. Les images doivent inclure des visages pour un rendu correct</li><li>2. L'«Image de Célébrité» peut être créée en utilisant le dessin MJ</li><li>3. L'«Image de Célébrité» peut également inclure des personnages d'anime</li><li>4. «Votre Avatar» est recommandé d'être une photo personnelle de la taille d'un passeport</li>",
		placeInput: "Veuillez remplir la demande!",
		more5sb: "Téléchargez jusqu'à 5 images au maximum",
		exSuccess:
			"Exportation réussie... Veuillez vérifier le dossier de téléchargement",
		downloadSave: "ai_drawing.txt",
		noproducet: "Pas encore d'œuvres matures pour le moment",
		imgBili: "Ratio d'Image",
		imagEx: "Exporter les Liens d'Œuvres d'Art",
		prompt: "Prompts",
		imgCYes: "Contient une Image de Base",
		imgCUpload: "Télécharger une Image de Base",
		imgCInfo:
			"Informations sur l'Image de Base:<br/>1. Utilisez vos propres images comme base pour le dessin MJ<br/>2. Vous pouvez utiliser plusieurs images de base, jusqu'à 5, chacune ne dépassant pas 1 Mo",
		imgCadd: "+Ajouter",
		del: "Supprimer",
		img2text: "Image-to-Text",
		img2textinfo:
			"Vous ne savez pas quels prompts utiliser? Essayez Image-to-Text! Soumettez une image pour obtenir des prompts",
		traning: "Traduction...",
		imgcreate: "Générer une Image",
		imginfo:
			"Autres paramètres:<li>1 --no: Ignorer --no car pour exclure les voitures de l'image</li><li>2 --seed: Obtenir d'abord une graine avec --seed 123456</li><li>3 --chaos 10: Mélanger (plage: 0-100)</li><li>4 --tile: Fragmentation</li>",
		tStyle: "Style",
		tView: "Vue",
		tShot: "Prise de Personnage",
		tLight: "Éclairage",
		tQuality: "Qualité de l'Image",
		tStyles: "Niveau Artistique",
		tVersion: "Version du Modèle",
		dalleInfo:
			"Note:<li>1. DALL-E est un modèle de génération d'images fourni par OpenAI</li><li>2. Les images OpenAI ont une date d'expiration, alors faites des sauvegardes</li><li>3. Remarque: Le prix des images de 1790 px est doublé</li>",
		version: "Version",
		size: "Taille",
		blendInfo:
			"Note:<li>1. Mélanger au moins 2 images</li><li>2. Jusqu'à 6 images peuvent être utilisées pour le mélange</li>",
		blendStart: "Commencer à Mélanger",
		no2add: "Ne pas ajouter d'images en double",
		add2more: "Veuillez ajouter deux images ou plus",
		no1m: "La taille de l'image ne peut pas dépasser 1 Mo",
		imgExt: "Les images ne supportent que les formats jpg, gif, png, jpeg",
		setSync: "Synchroniser Midjourney et Suno",
		addGPTS: "Ajouter des GPTs",
		addPlaceholder:
			"Collez le GID des GPTs ici ou collez directement le lien des GPTs",
		gidError: "GID valide introuvable, veuillez remplir à nouveau",
		success3: "GPTs ajoutés avec succès !",
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
		description: "Mode de description",
		custom: "Mode professionnel",
		style: "Style de chanson",
		stylepls: "Nom de la chanson, par exemple : Musique pop",
		emputy: "Aucun contenu disponible",
		noly: "Pas de paroles disponibles",
		inputly: "Veuillez saisir le nom de la chanson ou les paroles",
		doingly: "En cours, veuillez patienter.",
		doingly2: "Récupération des paroles...",
		title: "Nom de la chanson",
		titlepls: "Nom de la chanson, par exemple : Vacances",
		desc: "Description de la chanson",
		descpls:
			"Description de la chanson, par exemple : Musique pop originale sur les vacances",
		noneedly: "Pas besoin de paroles",
		rank: "Sélection aléatoire",
		ly: "Paroles",
		lypls: "Paroles : avec un certain format",
		generate: "Composer une chanson",
		generately: "Générer des paroles",
		nodata: "Veuillez composer d'abord pour obtenir une liste de chansons",

		menu: "Musique",
		menuinfo: "Création musicale Suno",
		server: "Point de terminaison de l'API Suno",
		serverabout: "Lié à Suno",
		setOpenKeyPlaceholder: "Clé associée pour l'API Suno ; facultatif",

		upMps: "Télécharger l'audio",
		extend: "Étendre",
		extendFrom: "Étendre depuis",
		extendAt: "Commencer l'extension à",
		fail: "Échec",
		info: "Instructions :<br>La durée de l'audio téléchargé doit être comprise entre 6s et 60s",
	},
	video: {
		menu: "Vidéos",
		menuinfo: "Création de vidéos Luma et autres",
		descpls: "Description de création de vidéos",
		lumaabout: "À propos de Luma",
		lumaserver: "Adresse de l'API Luma",
		setOpenKeyPlaceholder: "Clé API Luma, facultatif",
		generate: "Générer la vidéo",
		nodata: "Aucune vidéo disponible, veuillez d'abord générer !",
		selectimg: "Sélectionner une image",
		clear: "Effacer",
		plsInput: "Veuillez saisir du contenu !",
		submitSuccess: "Soumis avec succès !",
		process: "Génération de la vidéo...",
		repeat: "Réessayer",
		lumainfo:
			"Explication : <ul><li>1. Les vidéos de démonstration Pro et relax ont des liens avec des filigranes.</li><li>2. La version Pro sans filigrane nécessite d'obtenir le lien de téléchargement via le bouton 'Télécharger'.</li><li>3. Les liens pour les versions Pro sont limités dans le temps ; veuillez sauvegarder le fichier MP4 localement dès que possible.</li><li>4. Pour les versions Pro, sauvegardez le fichier MP4 localement dans les 30 minutes suivant la génération, car le canal peut être bloqué ou arrêté.</li><li>5. Si le lien de téléchargement pour les versions Pro est invalide, un lien vidéo avec filigrane sera fourni.</li></ul>",
		runwayabout: "Lié à Runway",
		runwayserver: "Adresse de l'API Runway",
		setOpenKeyPlaceholder2: "Clé API Runway, facultative",
		endImg: "Image de fin",
		runwayinfo:
			"Explication : <ul><li>1. Les images et vidéos de Runway ont une durée de validité.</li><li>2. Veuillez sauvegarder le fichier MP4 localement dans les 30 minutes suivant la génération de la vidéo.</li></ul>",
		nosup: "Non pris en charge temporairement",
		rwgen2: "Version : Gen-2, rentable",
		rwgen3: "Version : Gen-3 Alpha",
		repeat2: "Expired.Reget",
	},
	dance: {
		menu: "Danse",
		menuinfo: "Créez des vidéos de danse avec Viggle et d'autres.",
		character: "Personnage",
		viggleabout: "À propos de Viggle",
		viggleserver: "Adresse API Viggle",
		setOpenKeyPlaceholder: "Clé API Viggle, facultatif",
		info: "Instructions :<br>1. Les images de personnage devraient de préférence être des photos en pied.<br>2. Les vidéos de modèles de danse devraient être des vidéos personnelles, pas des danses de groupe.",
		model: "Modèle",
		bgw: "Arrière-plan blanc",
		bgg: "Arrière-plan vert",
		bgmoban: "Arrière-plan du modèle",
		bgrole: "Arrière-plan du personnage",
		gring: "En cours de génération...",
		uprolefirst: "Veuillez d'abord télécharger l'image du personnage",
		uprolefail: "Échec du téléchargement",
		upvideo: "+ Télécharger la vidéo de modèle de danse",
		usevideo: "+ Utiliser le modèle officiel",
		moban: "Modèle de danse",
		moban2: "Nom du modèle",
		use: "Utiliser",
	},
};
