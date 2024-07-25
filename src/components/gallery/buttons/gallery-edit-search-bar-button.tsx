import { useRef } from 'react';
import icoSearch from '../../../assets/ico-search.svg';
import { colors } from '../../../consts/colors';

export type GalleryEditSearchBarButtonProps = {
  width: number;
  height: number;
};

export const GalleryEditSearchBarButton: React.FC<
  GalleryEditSearchBarButtonProps
> = ({ width, height }) => {
  const searchDialogRef = useRef<HTMLDialogElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchBarIcoSize = 14;

  const randomActions = [
    'Find Annotation',
    'Find Next',
    'Find Previous',
    'Replace',
    'Replace All',
    'Replace Next',
    'Replace Previous',
    'Find in Files',
    'Counquer the World',
    'Save the World',
    'Execute the Queen',
    'Execute the King',
    'Join the Army',
    'Join the Navy',
    'Join the Airforce',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          width: width,
          height: height,
          backgroundColor: colors.offWhite,
        }}
        onClick={() => {
          searchDialogRef.current?.showModal();
        }}
      >
        <img
          src={icoSearch}
          width={searchBarIcoSize}
          height={searchBarIcoSize}
        />
        <span
          style={{
            paddingLeft: 5,
          }}
        >
          search
        </span>
      </div>
      <dialog
        ref={searchDialogRef}
        onClick={(e) => {
          if (searchDialogRef.current && searchContainerRef.current) {
            const rect = searchContainerRef.current.getBoundingClientRect();
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            ) {
              searchDialogRef.current.close();
            }
          }
        }}
        style={{
          width: width - 2,
          padding: 0,
          margin: 0,
          left: `calc(50% - ${width / 2}px)`,
          top: 10,
          // top: 50,
          backgroundColor: colors.offWhite,
          border: '1px solid #ccc',
          // border: 'none',
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div ref={searchContainerRef}>
          <div
            style={{
              padding: 4,
            }}
          >
            <input
              style={{
                width: width - 14,
                height: 20,
                padding: 0,
                margin: 0,
              }}
              type="text"
              defaultValue={'dfsdf'}
            />
          </div>

          {randomActions.map((action) => {
            return (
              <div
                key={action}
                style={{
                  padding: '2px 4px',
                  cursor: 'pointer',
                }}
              >
                {action}
              </div>
            );
          })}
        </div>
      </dialog>
    </div>
  );
};
