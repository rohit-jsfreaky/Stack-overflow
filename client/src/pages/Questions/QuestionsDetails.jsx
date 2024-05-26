import React, { useEffect, useState } from 'react';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { postAnswer, fetchAllQuestion, deleteQuestion, voteQuestion } from '../../actions/question';
import { useTranslation } from 'react-i18next';

const QuestionsDetails = () => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        setCopied(true);
        alert(t("questionDetails.copied"));
    };

    const { id } = useParams();
    const questionList = useSelector((state) => state.questionReducer);
    const [Answer, setAnswer] = useState("");
    const User = useSelector((state) => (state.currentUserReducer));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllQuestion());
    }, [dispatch]);

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();

        if (User === null) {
            alert(t("questionDetails.loginToAnswer"));
            navigate("/Auth");
        } else {
            if (Answer === '') {
                alert(t("questionDetails.enterAnswer"));
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name , userId : User.result._id}));
                setAnswer("");
            }
        }
    };

    if (!Array.isArray(questionList.data)) {
        console.error("questionList.data is not an array:", questionList.data);
        return <h1>Error loading questions</h1>;
    }

    const question = questionList.data.find(question => question._id === id);
    if (!question) {
        return <h1>Loading...</h1>;
    }

    const handleDelete = ()=>{
        console.log(id);
        dispatch(deleteQuestion(id, navigate));
    };

    const handleUpVote = ()=>{
        dispatch(voteQuestion(id, 'upvote' , User.result._id));
    };

    const handleDownVote = ()=>{
        dispatch(voteQuestion(id, 'downvote' , User.result._id));
    };

    return (
        <div className='question-details-page'>
            <div key={question._id}>
                <section className='question-details-container'>
                    <h1>{question.questionTitle}</h1>
                    <div className='question-details-container-2'>
                        <div className="question-votes">
                            <img src={upvote} alt="upvote" width="18" className='votes-icon' onClick={handleUpVote}/>
                            <p>{question.upVote.length - question.downVote.length}</p>
                            <img src={downvote} alt="downvote" width="18" className='votes-icon' onClick={handleDownVote}/>
                        </div>
                        <div style={{ width: "100%" }}>
                            <p className='question-body'>{question.questionBody}</p>
                            <div className="question-details-tags">
                                {question.questionTags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))}
                            </div>
                            <div className="question-actions-user">
                                <div>
                                    <CopyToClipboard text={window.location.href} onCopy={onCopy}>
                                        <button type='button'>{t("questionDetails.share")}</button>
                                    </CopyToClipboard>
                                    {User?.result?._id === question?.userId && (
                                        <button type='button' onClick={handleDelete}>{t("questionDetails.delete")}</button>
                                    )}
                                </div>
                                <div>
                                    <p>{t("questionDetails.asked")} {moment(question.askedOn).fromNow()}</p>
                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                        <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                        <div>{question.userPosted}</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {question.noOfAnswers !== 0 && (
                    <section>
                        <h3>{question.noOfAnswers} {t("questionDetails.answer", { count: question.noOfAnswers })}</h3>
                        <DisplayAnswer key={question._id} question={question} />
                    </section>
                )}
                <section className='post-ans-container'>
                    <h3>{t("questionDetails.yourAnswer")}</h3>
                    <form onSubmit={(e) => { handlePostAns(e, question.answer.length) }}>
                        <textarea name="" id="" cols="30" rows="10" onChange={(e) => { setAnswer(e.target.value) }} value={Answer}></textarea>
                        <input type="submit" className="post-ans-btn" value={t("questionDetails.postYourAnswer")} />
                    </form>
                    <p>{t("questionDetails.browseOtherQuestions")}
                        {question.questionTags.map((tag) => (
                            <Link to="/Tags" key={tag} className='ans-tags'>{tag}</Link>
                        ))} {t("questionDetails.or")} <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>{t("questionDetails.askYourOwnQuestion")}</Link>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default QuestionsDetails;
