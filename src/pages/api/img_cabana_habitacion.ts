import type { ImgCabanaHabitacion } from "../../types/global";

export async function getImgCabanaHabitacion(): Promise<ImgCabanaHabitacion[]> {
  try {
    const res = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/img_cabana_habitacion?select=imagen",
      {
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);

    const data = (await res.json()) as ImgCabanaHabitacion[];
    return data;
  } catch (error) {
    console.error("Error fetching imagenes:", error);
    return [];
  }
}
