import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Layout, PageHeader, Col, Row } from 'antd';

import Loading from '../components/atoms/Loading';
import { usePeople } from '../components/hooks/usePeople';
import { DEFAULT_PAGE_SIZE } from '../components/molecules/ListHeader';

const Image = styled.img`
  height: 44px;
  width: 95px;
  margin: 0 auto;
`;

const Splash = () => {
  const router = useRouter();
  const { execute, initialized: initializedPeopleInfo } = usePeople();

  useEffect(() => {
    execute(DEFAULT_PAGE_SIZE);
  }, []);

  useEffect(() => {
    if (initializedPeopleInfo) router.push('/home');
  }, [initializedPeopleInfo]);

  return (
    <PageHeader
      subTitle="We are loading your information"
      extra={[
        <Button
          key="beon-logo"
          type="link"
          href="https://beon.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/beon.svg" alt="BEON Logo" />
        </Button>,
      ]}
    >
      <Layout>
        <Layout.Content>
          <Row>
            <Col span={24}>
              {initializedPeopleInfo ? (
                <CheckOutlined />
              ) : (
                <Loading title="Loading people information" />
              )}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </PageHeader>
  );

  return (
    <p>Here at the splash...</p>
  )
};

export default Splash;
