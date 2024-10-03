'use server'
 
import { cookies } from 'next/headers'
 
export async function setCookie(token:string) {
  cookies().set("token", token);
}

export async function deleteCookie() {
  cookies().delete("token");
}

export async function getCookie() {
  cookies().get("token");
}