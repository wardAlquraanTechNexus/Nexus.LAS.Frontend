import { LanguageService } from "../../../services/language-service";

export function getDisplayColumns(langService: LanguageService, columns: { key: string, labelKey: string, pipes?: string[], inputType?: string }[]) {
  const getLabel = langService.getLabel.bind(langService);
  return columns.map(col => ({
    key: col.key,
    label: getLabel(col.labelKey),
    pipes: col.pipes,
    inputType: col.inputType
  }));
}