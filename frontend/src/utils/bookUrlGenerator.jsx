import React from "react"
function bookUrlGenerator(coverImg) {
    return new URL(`../assets/books/${coverImg}`, import.meta.url)}
export default bookUrlGenerator 