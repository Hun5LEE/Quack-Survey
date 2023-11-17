import { getUpdatedTime } from "@/utils/time/getUpdatedTime";
import { useRouter } from "next/navigation";
import { handleTemplateClick, handleTemplateModifyClick } from "@/utils/home";
import Image from "next/image";
import useDropDownMenu from "@/hooks/useDropDownMenu";
import useModal from "@/hooks/useModal";
import { useDeleteTemplate } from "@/hooks/mutation/useDeleteTemplate";

interface ITemplateItemProps {
  templateId: string;
  title: string;
  updatedAt: string;
}

const TemplateItem = ({
  templateId,
  title,
  updatedAt,
}: ITemplateItemProps): JSX.Element => {
  const router = useRouter();
  const { mutate } = useDeleteTemplate(templateId, "templateLists");
  const { DropDownMenu, openMenu, closeMenu } = useDropDownMenu();
  const { ModalContainer, openModal } = useModal(mutate);

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center opacity-80 duration-100 hover:opacity-100"
          onClick={() => handleTemplateClick(router, templateId)}
        >
          <div className="mr-4 flex h-[40px] w-[40px] items-center justify-center rounded-n-md bg-n-light-gray">
            <Image
              src="/images/document.svg"
              width={24}
              height={24}
              priority={true}
              alt="Documents"
            />
          </div>
          <div>
            <p className="text-black">{title || "제목 없음"}</p>
            <p className="text-n-xs text-n-gray">{getUpdatedTime(updatedAt)}</p>
          </div>
        </div>
        <div className="relative">
          <Image
            className="relative z-[5] cursor-pointer opacity-30 duration-100 hover:opacity-60"
            src="/images/more_black.svg"
            width={24}
            height={24}
            priority={true}
            alt="More"
            onClick={openMenu}
          />
          <DropDownMenu
            items={[
              {
                title: "수정",
                callback: () => handleTemplateModifyClick(router, templateId),
              },
              {
                title: "삭제",
                callback: () => {
                  closeMenu();
                  openModal();
                },
              },
            ]}
          />
        </div>
      </div>
      <ModalContainer title="삭제 확인">
        <div className="text-n-sm">
          작성된 설문 템플릿, 설문에 대한 응답 결과 등. 템플릿
          <span className="text-n-md font-bold"> {title} </span>와 관련된 모든
          내용이 삭제됩니다.
        </div>
      </ModalContainer>
    </>
  );
};

export default TemplateItem;
