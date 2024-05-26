import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AskQuestion.css';
import { askQuestion } from '../../actions/question';
import { useTranslation } from 'react-i18next';

const AskQuestion = () => {
  const { t } = useTranslation();

  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: user.result.name,
          userId: user?.result._id,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(questionBody + '\n');
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>{t('askQuestion.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>{t('askQuestion.labels.title')}</h4>
              <p>{t('askQuestion.labels.titlePlaceholder')}</p>
              <input
                type="text"
                name="questionTitle"
                id="ask-ques-title"
                placeholder=""
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>{t('askQuestion.labels.body')}</h4>
              <p>{t('askQuestion.labels.bodyPlaceholder')}</p>
              <textarea
                name=""
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>{t('askQuestion.labels.tags')}</h4>
              <p>{t('askQuestion.labels.tagsPlaceholder')}</p>
              <input
                type="text"
                name="questionTitle"
                id="ask-ques-tags"
                placeholder=""
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(' '));
                }}
              />
            </label>
          </div>
          <input type="submit" value={t('askQuestion.submit')} className="review-btn" />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
