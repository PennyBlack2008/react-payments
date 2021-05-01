import PropTypes from 'prop-types';
import { Header } from '../../components/commons/header/Header';
import { Button } from '../../components/commons/button/Button';
import { Card } from '../../components/commons/card/Card';
import Styled from './style';
import { PAGE } from '../../constants/page';
import { CreditCard } from '../../components/commons/card/CreditCard';
import { firestore } from '../../firebase';

const CardListPage = ({ setCurrentPage, cardList, setCardInfoForEdit, setCardList }) => {
  const handleCardEdit = cardInfo => {
    setCardInfoForEdit(cardInfo);
    setCurrentPage(PAGE.CARD_CREATION);
  };

  const handleCardDelete = async deleteId => {
    await firestore.collection('cardList').doc(deleteId).delete();

    setCardList(prevState => {
      const copiedState = [...prevState];
      const filteredCardList = copiedState.filter(card => card.id !== deleteId);

      return filteredCardList;
    });
  };

  const creditCardList = cardList.map(card => (
    <Styled.CardItem key={card.id}>
      <CreditCard
        backgroundColor={card.selectedCardInfo.color}
        content={{
          cardType: card.selectedCardInfo.name,
          cardNumber: card.cardNumber,
          cardOwner: card.cardOwner,
          cardExpiredDate: card.cardExpiredDate,
        }}
      />
      <Styled.CardNickname>{card.cardNickname}</Styled.CardNickname>
      <div>
        <Button onClick={() => handleCardEdit(card)}>수정하기</Button>
        <Button onClick={() => handleCardDelete(card.id)}>삭제하기</Button>
      </div>
    </Styled.CardItem>
  ));

  return (
    <>
      <Header>보유카드</Header>
      <Styled.CardList>
        <Styled.CardItem>
          <Button onClick={() => setCurrentPage(PAGE.CARD_CREATION)}>
            <Card styles={{ boxShadow: 'none' }}>+</Card>
          </Button>
        </Styled.CardItem>
        {creditCardList}
      </Styled.CardList>
    </>
  );
};

CardListPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  setCardInfoForEdit: PropTypes.func.isRequired,
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCardList: PropTypes.func.isRequired,
};

export default CardListPage;
