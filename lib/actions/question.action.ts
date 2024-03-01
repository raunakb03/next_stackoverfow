"use server"

import { connectToDatabase } from "../mongoose"

export async function createQuestion (paramas: any) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log("ERROR FROM CREATE QUESTION ", error);
  }
}