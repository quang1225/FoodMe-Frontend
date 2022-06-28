import CommonButton from '@components/shared/CommonButton';
import CommonCheckBox from '@components/shared/CommonCheckBox';
import { Box, Dialog, FormGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  getListIssues,
  reportIssues,
} from '@services/restaurants/restaurantDetailApi';
import { RootState } from '@stateManager/stores/appStore';
import { cloneDeep, remove } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MODAL_TYPE } from 'utils/constant';
import { WrongMenuModal } from './WrongMenuModal';

const useStyles = makeStyles((theme: any) => ({
  title: {
    padding: theme.spacing(3),
  },
  content: {},
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  action: {
    padding: theme.spacing('3'),
    justifyContent: 'center !important',
    cursor: 'auto',
  },
}));

const Button = styled(CommonButton)`
  padding: 12px 35px !important;
  font-size: 16px;
`;

export interface IReportListDialogProps {
  isOpen: boolean;
  handleClose: any;
  setOpenModal: any;
  menu: any;
  id: string;
}
const ReportListDialog = ({
  isOpen,
  handleClose,
  setOpenModal,
  menu,
  id,
}: IReportListDialogProps) => {
  const classes = useStyles();
  const handleReportClose = () => {
    setSelectedIssues([]);
    handleClose();
  };
  const [listIssues, setListIssues] = useState<any>([]);
  const [selectedIssues, setSelectedIssues] = useState<any>([]);
  const { openModal } = useSelector((state: RootState) => state.common || {});

  useEffect(() => {
    const getIssue = async () => {
      const listIssuesNew = await getListIssues();
      setListIssues(listIssuesNew);
    };

    getIssue();

    return () => {
      setListIssues([]);
    };
  }, []);

  const onCheckValue = (event: any, value: number) => {
    let cloneData = cloneDeep(selectedIssues);
    if (event.target.checked) {
      cloneData.push(value);
    } else {
      cloneData = remove(cloneData, (item: number) => {
        return item !== value;
      });
    }
    setSelectedIssues(cloneData);
  };

  const onSubmit = () => {
    if (selectedIssues.includes(1) || selectedIssues.includes(2)) {
      setOpenModal(MODAL_TYPE.WRONG_MENU);
    } else {
      handleSubmit();
      // setOpenModal(MODAL_TYPE.THANKS);
    }
  };

  const handleSubmit = () => {
    const report = async () => {
      const payload: any[] = [];
      selectedIssues.forEach((issue: number) => {
        payload.push({ type: issue });
      });
      const result = await reportIssues(id, payload);
      if (result) {
        setOpenModal(MODAL_TYPE.THANKS);
      }
    };
    report();
    setSelectedIssues([]);
  };

  const handleReportMenuItems = (selectedItem: number[]) => {
    const report = async () => {
      const payload: any[] = [];
      selectedIssues.forEach((issue: number) => {
        if (issue === 1 || issue === 2) {
          payload.push({ type: issue, correctValues: selectedItem });
        } else payload.push({ type: issue });
      });
      const result = await reportIssues(id, payload);
      if (result) {
        setOpenModal(MODAL_TYPE.THANKS);
      }
    };
    report();
    setSelectedIssues([]);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={handleReportClose}
        PaperProps={{
          style: {
            maxWidth: '460px',
            padding: '20px 34px 23px 34px',
          },
        }}
      >
        <Typography
          className="title-font"
          color="var(--orange-zest-2)"
          fontWeight={700}
          fontSize={30}
        >
          Spot an issue on this page?
        </Typography>
        <Box className={classes.content}>
          <Typography
            fontSize={14}
            color="var(--neutral-black-1)"
            mb="30px"
            mt="15px"
          >
            We work very hard to ensure all our information is accurate
            <br />
            and up-to-date. Let us know what doesn’t look right and <br /> we’ll
            get it sorted...
          </Typography>

          <FormGroup sx={{ gap: '15px' }}>
            {listIssues?.length > 0
              ? listIssues.map((item: any, index: number) => {
                  return (
                    <CommonCheckBox
                      key={index}
                      checked={
                        selectedIssues?.length > 0 &&
                        selectedIssues.includes(item?.id)
                      }
                      onChange={(e: any) => {
                        onCheckValue(e, item?.id);
                      }}
                      text={
                        <Typography
                          fontSize={14}
                          color={
                            selectedIssues?.length > 0 &&
                            selectedIssues.includes(item?.id)
                              ? 'var(--leafy-green-2)'
                              : 'var(--neutral-black-1)'
                          }
                          fontWeight={
                            selectedIssues?.length > 0 &&
                            selectedIssues.includes(item?.id)
                              ? 700
                              : 400
                          }
                        >
                          {item.name || ''}
                        </Typography>
                      }
                    />
                  );
                })
              : ''}
          </FormGroup>
        </Box>

        <Box className={classes.option} mt="65px">
          <Button
            onClick={handleReportClose}
            $textColor="var(--neutral-7)"
            background="var( --orange-zest-2)"
            height={46}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!selectedIssues.length}
            $textColor="var(--neutral-7)"
            background="var(--leafy-green-2)"
            height={46}
          >
            Submit
          </Button>
        </Box>
      </Dialog>

      <WrongMenuModal
        handleClose={() => {
          setOpenModal('');
          setSelectedIssues([]);
        }}
        isOpen={openModal === MODAL_TYPE.WRONG_MENU}
        handleSubmit={handleReportMenuItems}
        menu={menu}
      />
    </>
  );
};

export default ReportListDialog;
