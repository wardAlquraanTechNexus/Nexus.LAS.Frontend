export interface CreateMenuCommand {
    parentId?: number | null;
    name: string;
    path?: string | null;
    rank?: number | null;
    description?: string | null;
    iconClass?: string | null;
    inDashboard: boolean;
}