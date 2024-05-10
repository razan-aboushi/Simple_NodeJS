const connection = require("../models/dbConncet");

const getSummariesForUser = (req , res) => {
    const summaryId = req.params.summaryId;
    const summariesQuery = `select *
                            from summaries
                            where summary_id = ?`;

    connection.query(summariesQuery, [summaryId], (summariesError, summariesResult) => {

        if (summariesError) {
            console.log(summariesError.message);
            res.status(500).send(summariesError);
        } else if (summariesResult.length <= 0) {
            res.status(404).send(`There is no summary with this id ${summaryId}`)
        }

        const summariesData = summariesResult[0];
        const userId = summariesData.user_id;

        const summariesOwnerQuery = `select *
                                     from users
                                     where user_id = ?`;
        connection.query(summariesOwnerQuery, [userId], (userError, userResult) => {
            if (userError) {
                res.status(500).send(userError);
            } else if (userResult.length <= 0) {
                res.status(404).send(`There is no summary with this id ${userId}`);
            }

            const userData = userResult[0];
            const allData = {
                summariesData: summariesData,
                userData: userData
            }

            res.status(200).send(allData);
        })
    })
}

module.exports = {
    getSummariesForUser
}