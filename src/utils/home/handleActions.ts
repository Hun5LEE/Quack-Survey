import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface IHandelCreateClick {
  (router: AppRouterInstance): void;
}

interface IHandleTemplateClick {
  (router: AppRouterInstance, target: string): void;
}

const handleCreateClick: IHandelCreateClick = (router): void => {
  router.push(`/templateBuilder`);
};

const handleTemplateClick: IHandleTemplateClick = (router, target) => {
  router.push(`/templateBuilder/${target}/preview`);
};

const handleTemplateModifyClick: IHandleTemplateClick = (router, target) => {
  router.push(`/templateBuilder/${target}`);
};

export { handleCreateClick, handleTemplateClick, handleTemplateModifyClick };
