import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PageIntro from './PageIntro';
import PageList from './PageList';
import Loader from './Loader';
import { parseClassData } from '../utility/parseClassData';
import { parseRaceData } from '../utility/parseRaceData';

const PageContainer = ({
  isRace,
  isModal,
  selection,
  isLoading,
  selectedRace,
  selectedClass,
}) => {
  // console.log('is race:', isRace, 'selection:', selection);
  let classSelection;
  let raceSelection;
  if (!isLoading && !isRace) {
    classSelection = parseClassData(selection);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    console.log('in PAGECONT classSelection:', classSelection);
  } else {
    if (isRace && !selectedRace) {
      raceSelection = parseRaceData(selection);
      console.log('in PAGECONT raceSelection:', raceSelection);
    }
  }

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <PageIntro
            isRace={isRace}
            isModal={isModal}
            selection={isRace ? raceSelection : classSelection}
            isLoading={isLoading}
            selectedRace={selectedRace}
            selectedClass={selectedClass}
          />
          {/* SummaryList */}
          {isModal && isRace ? (
            <Row className='full-width-row'>
              <Col className='full-width-col'>
                <div
                  className={
                    isModal
                      ? 'confirmation-summarylist'
                      : 'selection-summarylist'
                  }
                >
                  <p>
                    {isRace ? `Race Traits:` : null}
                    <span>
                      {isRace && raceSelection.traitNames.length > 0
                        ? `${raceSelection.traitNames.join(', ')}`
                        : null}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          ) : null}
          <PageList
            isRace={isRace}
            isModal={isModal}
            selection={isRace ? raceSelection : classSelection}
            isLoading={isLoading}
            selectedRace={selectedRace}
            selectedClass={selectedClass}
          />
        </>
      )}
    </Container>
  );
};

export default PageContainer;
