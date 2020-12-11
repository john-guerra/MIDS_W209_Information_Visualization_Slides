# Terraform Demo

Based on code for a demo given at the MassMutual Data Science Seminar on 2020-02-21.

Motivate by the title of [My data scientist doesn’t know how to properly start an EC2 instance](https://towardsdatascience.com/my-data-scientist-doesnt-know-how-to-properly-start-an-ec2-instance-b1b9f4920359).

## 1. Set up AWS credentials

Without a helper tool to authenticate to AWS, we can get the necessary token from our account.
See instruction from Amazon [here](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

## 2. Set up TF templates

    terraform init && terraform get
    terraform plan -var-file=".env/dev.tfvars"

## 3. Deploy

    terraform apply -var-file=".env/dev.tfvars"

## 3. Destroy

    terraform destroy -var-file=".env/dev.tfvars"
