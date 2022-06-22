import { configureStore } from "@reduxjs/toolkit"
import nightSlice from "./nightSlice"

export default configureStore({
    reducer:{
        night:nightSlice
    }
})