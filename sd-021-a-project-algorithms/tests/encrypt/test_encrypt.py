from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():
    assert encrypt_message("string", 2) == "gnir_ts"
    assert encrypt_message("string", 3) == "rts_gni"
    assert encrypt_message("string", 9) == "gnirts"

    with pytest.raises(TypeError, match="tipo inválido para key"):
        encrypt_message("string", "3")

    with pytest.raises(TypeError, match="tipo inválido para message"):
        encrypt_message(None, 1)
