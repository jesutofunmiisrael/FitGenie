const getEndDate = (plan) => {
    const end = new Date();

    if (plan === "monthly") end.setMonth(end.getMonth() + 1);
    if (plan === "quarterly") end.setMonth(end.getMonth() + 3);
    if (plan === "yearly") end.setFullYear(end.getFullYear() + 1);

    return end;
};

module.exports = {
    getEndDate
}