export interface MenuTree {
    menuId: number;
    menuParentId?: number;
    name: string;
    path?: string;
    iconClass?: string;
    access?: boolean;
    canInsert?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
    children: MenuTree[];
}