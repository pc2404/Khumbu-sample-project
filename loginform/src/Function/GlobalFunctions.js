
export const formatDate=(dob)=>{
    const date = new Date(dob);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export const generateRegexExpression=(policy)=> {
   
    let pattern = "";
    if (policy?.UppercaseLength > 0) pattern += `(?=(?:.*?[A-Z]){${policy.UppercaseLength},})`;
    if (policy?.LowercaseLength > 0) pattern += `(?=(?:.*?[a-z]){${policy.LowercaseLength},})`;
    if (policy?.NonAlphaLength > 0) pattern += `(?=(?:.*?[!@#$%^&*()_+-={}\\[\\]\\|;:'\",.<>/?\`~]){${policy.NonAlphaLength},})`;
    if (policy?.NumericLength > 0) pattern += `(?=(?:.*?\\d){${policy.NumericLength},})`;
    if (policy?.AlphaLength > 0) pattern += `(?=(?:.*?[A-Za-z]){${policy.AlphaLength},})`;
    pattern = `^${pattern}.{${policy?.MinimumLength},${policy?.MaximumLength}}$`;
    return new RegExp(pattern);
  }

export const fetchPolicy=async(setPolicyCriteria)=>{
    const response=await fetch("https://idm-core-service-proxy-sandbox.khumbusystems.net/api/application/password-policy?applicationID=money360_cardholder_web_ui@ist&isnew=false&language=en")
    const policyRes=await response.json();
    const policyObj=policyRes.Response;
    // console.log("response",policyRes.Response);
    setPolicyCriteria(policyObj);

}