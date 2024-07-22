import { useState } from 'react';
import icoSearch from '../../../assets/ico-search.svg';
import { colors } from '../../../consts/colors';

export type GalleryEditSearchBarButtonProps = {
  width: number;
  height: number;
};

export const GalleryEditSearchBarButton: React.FC<
  GalleryEditSearchBarButtonProps
> = ({ width, height }) => {
  const searchBarIcoSize = 14;
  const [isSearchDialogVisible, setIsSearchDialogVisible] = useState(false);

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
        className="ns"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          backgroundColor: 'white',
          width: width,
          height: height,
        }}
        onClick={() => {
          setIsSearchDialogVisible((prev) => !prev);
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
      {isSearchDialogVisible && (
        <div
          style={{
            zIndex: 1,
            width: width,
            height: 400,
            backgroundColor: colors.offWhite,
            border: '1px solid #ccc',
            position: 'relative',
            top: -height,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          onMouseLeave={() => {
            setIsSearchDialogVisible(false);
          }}
        >
          <div
            style={{
              width: width - 4,
              padding: 4,
            }}
          >
            <input
              style={{
                width: width - 16,
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
                  backgroundColor: 'white',
                }}
              >
                {action}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
