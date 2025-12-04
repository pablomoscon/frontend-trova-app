import { AlbumFormData } from "../Interfaces/AlbumInterface";

export type AlbumInputEvent =
    React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;

export type CustomInputEvent<K extends keyof AlbumFormData> = {
    target: {
        name: K;
        value: AlbumFormData[K];
    };
};