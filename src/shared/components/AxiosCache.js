import axios from "axios"
import { setupCache } from "axios-cache-adapter";
import Config from "../constants/Config";

const cache = setupCache({
	maxAge: Config.MaxAge
})

const noCache = setupCache({
	maxAge: Config.NoAge
})

export const AxiosCache = axios.create({
	adapter: cache.adapter
})

export const AxiosNoCache = axios.create({
	adapter: noCache.adapter
})
