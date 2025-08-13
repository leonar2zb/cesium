export type LoginResponse = {
    token: string;
    refresh_token: string;
    status: string;
    userID: string;
    first_name: string;
    last_name: string;
    username: string;
    email_address: string;
    photo: string | null;
    active: boolean;
    es_agente: boolean;
    currency: string;
    telefono: string | null;
    country: string | null;
    country_name: string | null;
    skype: string | null;
    cardType: string;
    language: string;
    language_name: string;
    fechaNacimiento: string | null;
    sexo: string;
    direccion: string | null;
    itineraryShow: string | null;
    agencyConfig: unknown[];
}
/*{
    "token": "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VySUQiOiI1Njg5IiwiZmlyc3RfbmFtZSI6IkxlbyIsImxhc3RfbmFtZSI6IlIiLCJ1c2VybmFtZSI6InVzZXIxa3VuYXZlcnNvIiwiZW1haWxfYWRkcmVzcyI6InVzZXIxQGt1bmF2ZXJzby5jb20iLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiZXhwIjoxNzUwMzQwMTQ3LCJpYXQiOjE3NDY3NDAxNDd9.QqIHJJcmbZwI5VZPvTcUXPJyckMtJPcVni_PBZyIpnjk5AyzvOU1KX5YJF_65Z1pQi3pvByxeWGfspiVZ-dzqoV5XaALJz6CFdpN9VJeswdRHeFiu8HrplN9oselQsSUDUvlIiPY-MaIrpPyH1eh0IkdvwEy1PSIKQO6atGLRay1bMAHbY8gSU9jqwRc3FLuYaWl44PXzc7MIu0vUhDcUgreqzT0VQ0YPyzXzQgzv_1kiN70ulEtzPVbF8oWqaA6SdsF1_XapjBIrTJDZDdexeslAhet5PjpJ33yX6YpKbMhH2LKYwTieJZvWjqQNhneXsHUaCccMsWkexerTShW0kOdzaSrol_x-JLRmMHsfPkzp6J9SU5qrtm8_MPZDkhCQDGhdmdc0sedesdDrHARJZIkxkbS9-mkxYzIC1F9ejHKpbklRl_F3aCVPqU02kXjW5-Nxxb4oxFZufifDMmFefUP8EvtrGFzCAkPTIyta52cwSY_uRIuImuCNqwTYGy5bWPIu5s3EoCVu4uC01eHTpTX24a9Pyo1bSKiYgSIsmgPDtndllpGeKlV8cdh8nn3dK90U2RoyPyo9nvo4JsKEx0OPP0jdqqjwEjJleiYuN5e1UrcFqUKTXxhsvI52g_f5qvk46njwFIDD-V9VfxknQMeeuQMniF0dZD0hCPWTJw",
    "refresh_token": "7df8aadec33d1f4248e5554585f9b6e24119efa6af7e164a9e24d6111980dcfb62102d908bc0469bd1aa79b216536503fbd3e0a7a844833d71f5361d24b470c7",
    "status": "success",
    "userID": "5689",
    "first_name": "Leo",
    "last_name": "R",
    "username": "user1kunaverso",
    "email_address": "user1@kunaverso.com",
    "photo": null,
    "active": true,
    "es_agente": false,
    "currency": "USD",
    "telefono": null,
    "country": null,
    "country_name": null,
    "skype": null,
    "cardType": "",
    "language": "fr",
    "language_name": "Français",
    "fechaNacimiento": null,
    "sexo": "f",
    "direccion": null,
    "itineraryShow": null,
    "agencyConfig": []
  }*/


export type LoginData = {
    emailAddress: string;
    password: string;
}

export type ApiError = {
    status: number;
    message: string;
}

// Tipo para la respuesta del endpoint de avatar
export type UserAvatarResponse = {
    success: boolean;
    msg: string;
    data: {
        config?: string;
    }
}

export type WhatsApp = {
    phone: string;
    message: string;
}

export type UrlToCall = {
    url: string;
}

export type Youtube = {
    url?: string;
    videoId?: string;
}

export type UnrealLog = {
    message: string;
    level?: 'info' | 'warn' | 'error';
}

// Tipo para los datos de registro
export type RegisterData = {
    emailAddress: string;
    password: string;
    sexo: string;
    firstName: string;
    lastName: string;
    direccion: string;
    moneda: number;
    idioma: string;
    skype: string;
    telefono: string;
    fechaNacimiento: string;
}

// Tipo para la respuesta del registro
export type RegisterResponse = {
    success: boolean;
    message?: string;
    data?: any;
}

export type RoleType = {
    Role?: 'Client' | 'Server';
}
