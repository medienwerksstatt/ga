export interface MenuPageInterface {
    title: string;
    url: string | [string, number];
    icon: string;
    external?: boolean;
    submenu?: string;
}
