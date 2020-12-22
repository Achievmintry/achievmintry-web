import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  Text,
  Box,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import {
  useChainLogs,
  useChievs,
  useTxProcessor,
  useUser,
} from "../contexts/DappContext";
import { useForm } from "react-hook-form";
import { FaPencilAlt } from "react-icons/fa";

const STATUS_TOKEN = { id: "25", price: "100000000000000000" };

const ProfileStatus = ({ addr }) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [user] = useUser();
  const [chievs] = useChievs();
  const [txProcessor, updateTxProcessor] = useTxProcessor();
  const [chainLogs] = useChainLogs();

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (!chainLogs?.tokenData) {
      return;
    }
    const _currentStatus = chainLogs.tokenData.allTokens
      .filter(
        (t) =>
          +t.clonedFromId === +STATUS_TOKEN.id &&
          t.type === "clone" &&
          t.receiver &&
          t.sender &&
          addr &&
          t.receiver.toLowerCase() === addr.toLowerCase() &&
          t.sender.toLowerCase() === addr.toLowerCase()
      )
      .sort((a, b) => b.blockNumber - a.blockNumber);
    if (_currentStatus[0]) {
      setCurrentStatus(_currentStatus[0].details);
    } else {
      setCurrentStatus(null);
      setShowStatusForm(false);
    }
  }, [chainLogs, addr, user]);

  const txCallBack = (txHash, details) => {
    if (txProcessor && txHash) {
      txProcessor.setTx(txHash, user.username, details, true, false);
      txProcessor.forceUpdate = true;
      setLoading(false);
      setShowStatusForm(false);
      updateTxProcessor(txProcessor);
    }
    if (!txHash) {
      console.log("error: ", details);
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log("values", values);
    try {
      chievs.service.clone(
        [user.username],
        user.username,
        STATUS_TOKEN.id,
        STATUS_TOKEN.price,
        txCallBack,
        values.detail
      );
      setCurrentStatus(values.detail);
    } catch (err) {
      setLoading(false);
      console.log("error: ", err);
    }
  };
  return (
    <>
      <Box>
        {currentStatus ? (
          <Box>
            Current Status:
            <Heading>{currentStatus}</Heading>
          </Box>
        ) : (
          <Text>No Status Set</Text>
        )}
        {user?.username === addr && !showStatusForm && (
          <Tooltip label="Update your status" aria-label="update status button">
            <Button onClick={() => setShowStatusForm(true)}>
              <FaPencilAlt />
            </Button>
          </Tooltip>
        )}
      </Box>

      {user?.username === addr && showStatusForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="detail">Status</FormLabel>
            <Textarea
              ref={register({ maxLength: 128 })}
              name="detail"
              aria-describedby="detail-helper-text"
              color="black"
              bg="primary.300"
              borderWidth="5px"
              borderColor="black.500"
              borderRadius="0"
              readOnly={loading}
            />

            {errors.detail === "maxLength" && (
              <FormErrorMessage>Your input exceed maxLength</FormErrorMessage>
            )}

            <FormHelperText p="1" id="detail-helper-text">
              Status update ( up to 128 chars)
            </FormHelperText>
          </FormControl>

          <Button
            isLoading={loading}
            loadingText="Gifting"
            bg="white"
            borderWidth="5px"
            borderColor="black.500"
            borderRadius="0"
            type="submit"
            disabled={loading}
          >
            Update
          </Button>
        </form>
      )}
    </>
  );
};

export default ProfileStatus;
