import DefaultCard from '@/styles/Card';
import DefaultText from '@/styles/Text';
import React from 'react';
import BlackRightArrowButton from '@/assets/icon/BlackRightArrowIcon.svg';
import styled from 'styled-components/native';
import { rHeight, rWidth } from '@/utils/style';
import { View } from 'react-native';

const HomeInfoCardContainer = styled(DefaultCard)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: ${rHeight(24)}px ${rWidth(24)}px;
`;
const CardTitleWrapper = styled(DefaultText)``;
const CardContentTextWrapper = styled(DefaultText)``;
const CardContentBox = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface HomeInfoCardProps {
  title: string;
  firstContent: string;
  secondContent: string;
  onPress: () => void;
}
export default function HomeInfoCard({
  title,
  firstContent,
  secondContent,
  onPress,
}: HomeInfoCardProps) {
  return (
    <HomeInfoCardContainer size="lg">
      <CardTitleWrapper typography="captionr" color="secondary">
        {title}
      </CardTitleWrapper>
      <CardContentBox>
        <View>
          <CardContentTextWrapper typography="p2b" color="black">
            {firstContent}
          </CardContentTextWrapper>
          <CardContentTextWrapper typography="p2b" color="black">
            {secondContent}
          </CardContentTextWrapper>
        </View>
        <BlackRightArrowButton
          width={rWidth(20)}
          height={rHeight(20)}
          onPress={onPress}
        />
      </CardContentBox>
    </HomeInfoCardContainer>
  );
}
