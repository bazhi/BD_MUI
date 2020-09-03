import axios from "axios"
import {setupCache} from "axios-cache-adapter";
import Config from "../Constants/Config";

const cache = setupCache({
	maxAge : Config.MaxAge
})

const AxiosCache = axios.create({
	adapter : cache.adapter
})

export default AxiosCache;